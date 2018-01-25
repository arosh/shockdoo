import { DocumentReference, Transaction } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import * as express from 'express';
import * as multer from 'multer';

import { spawn } from 'child-process-promise';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const { FieldValue } = admin.firestore;

const app = express();
const maxFileSize = 5242880; // 5MiB
const upload = multer({ dest: os.tmpdir(), limits: { fileSize: maxFileSize } });

const authenticate = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
    req.uid = decodedIdToken.uid;
    next();
  }).catch((error) => {
    res.status(403).send('Unauthorized');
  });
};

app.use(authenticate);

app.post('/api/set_user_name', async (req: any, res) => {
  const MAX_LENGTH = 20;
  const { uid } = req;
  const userName: string = req.body.userName;
  console.log(`set_user_name(uid = ${uid}, userName = ${userName})`);
  if (!userName || userName.length > MAX_LENGTH) {
    res.status(400).send('Bad Request');
    return;
  }
  await db.collection('users').doc(uid).update({ userName });
  res.status(200).json({ ok: true });
});

const getUserName = async (uid: string) => {
  const user = await db.collection('users').doc(uid).get();
  return user.get('userName');
};

const generateThumbnail = async (imagePath: string) => {
  const thumbPath = path.join(path.dirname(imagePath), 'thumb_' + path.basename(imagePath));
  // -thumbnail を指定すると -strip になる
  // -thumbnail 768x768^ で短いほうの辺が768pxの長方形を作る（もともと小さい場合は無視）
  // -gravity center -extent 768x768 で中央だけ切り取る
  await spawn('convert', [
    imagePath,
    '-auto-orient',
    '-thumbnail',
    '768x768^',
    '-gravity',
    'center',
    '-extent',
    '768x768',
    thumbPath,
  ]);
  console.log('Thumbnail created at', thumbPath);
  return thumbPath;
};

const getExtension = (mimeType: string): string => {
  switch (mimeType) {
    case 'image/gif':
      return 'gif';
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    default:
      throw new Error(`Unknown MIME type: ${mimeType}`);
  }
};

const uploadToBucket = async (localPath: string, bucketPath: string, contentType: string) => {
  const bucket = admin.storage().bucket();
  // https://firebase.google.com/docs/reference/js/firebase.storage.UploadMetadata?hl=ja
  const metadata = {
    cacheControl: 'public, max-age=3600',
    contentType,
  };
  await bucket.upload(localPath, { destination: bucketPath, metadata });
  await fs.unlinkSync(localPath);
  // https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(bucketPath)}?alt=media`;
};

const countUp = async (transaction: Transaction, counterRef: DocumentReference): Promise<number> => {
  const counterSnapshot = await transaction.get(counterRef);
  let count: number;
  if (counterSnapshot.exists) {
    count = counterSnapshot.get('count') || 0;
  } else {
    count = 0;
    transaction.set(counterRef, { count });
  }
  count++;
  console.log(`count = ${count}`);
  transaction.update(counterRef, { count });
  return count;
};

app.post('/api/add_photo', upload.single('image'), async (req: any, res) => {
  const { uid } = req;
  const userNamePromise = getUserName(uid);
  const imagePath = req.file.path;
  const mimeType = req.file.mimetype;
  if (!mimeType.startsWith('image/')) {
    res.status(400).send('Bad Request');
    return;
  }
  const star = parseInt(req.body.star, 10);
  if (!(1 <= star && star <= 5)) {
    res.status(400).send('Bad Request');
    return;
  }
  const thumbPathPromise = generateThumbnail(imagePath);
  const photosCounterRef = db.collection('_counters').doc('photos');
  const photoRef = db.collection('photos').doc();
  const imageBucketPath = path.join('image', photoRef.id + '.' + getExtension(req.file.mimetype));
  const imageURLPromise = uploadToBucket(imagePath, imageBucketPath, mimeType);
  const thumbBucketPath = path.join('thumb', photoRef.id + '.' + getExtension(req.file.mimetype));
  const thumbURLPromise = uploadToBucket(await thumbPathPromise, thumbBucketPath, mimeType);
  await db.runTransaction(async (transaction) => {
    const count = await countUp(transaction, photosCounterRef);
    transaction.set(photoRef, {
      id: count,
      uid,
      userName: await userNamePromise,
      star,
      imageURL: await imageURLPromise,
      thumbURL: await thumbURLPromise,
      likes: 0,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
  res.status(200).json({ id: photoRef.id });
});

exports.api = functions.https.onRequest(app);

exports.onUserCreated = functions.auth.user().onCreate((event) => {
  const uid = event.data.uid;
  console.log(`onUserCreated(uid = ${uid})`);
  const usersCounterRef = db.collection('_counters').doc('users');
  const userRef = db.collection('users').doc(uid);
  return db.runTransaction(async (transaction) => {
    const count = await countUp(transaction, usersCounterRef);
    transaction.set(userRef, {
      id: count,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
});
