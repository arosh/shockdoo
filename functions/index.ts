import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase);
import { spawn } from 'child-process-promise';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as pathMatch from 'path-match';

const db = admin.firestore();
const { FieldValue } = admin.firestore;

exports.createUser = functions.auth.user().onCreate((event) => {
  const uid = event.data.uid;
  console.log(`uid = ${uid}`);
  const counterRef = db.collection('_counters').doc('users');
  const userRef = db.collection('_users').doc(uid);
  return db.runTransaction(async (transaction) => {
    const usersDoc = await transaction.get(counterRef);
    let count: number;
    if (usersDoc.exists) {
      count = usersDoc.get('count') || 0;
    } else {
      count = 0;
      transaction.set(counterRef, { count });
    }
    count++;
    console.log(`count = ${count}`);
    transaction.update(counterRef, { count });
    transaction.set(userRef, {
      serial: count,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
});

exports.generateThumbnail = functions.storage.object().onChange(async (event) => {
  const object = event.data;
  const bucketName = object.bucket;
  const imagePath = object.name;

  // Exit if this is a move or deletion event.
  if (object.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (object.resourceState === 'exists' && object.metageneration > 1) {
    console.log('This is a metadata change event.');
    return;
  }

  if (!object.contentType.startsWith('image/')) {
    console.log(`Content-Type match is failed (contentType = ${object.contentType}).`);
    return;
  }

  const matchOptions = { sensitive: true, strict: true, end: true };
  const match = pathMatch(matchOptions)('/:uid/image/:basename');
  const params = match(imagePath);
  if (params === false) {
    console.log(`path match is failed (filePath = ${imagePath}).`);
    return;
  }

  const { uid, basename } = params;

  // admin.storage().bucket() で良い？
  // https://firebase.google.com/docs/reference/admin/node/admin.storage.Storage?authuser=0
  const bucket = admin.storage().bucket(bucketName);
  const tempFilePath = path.join(os.tmpdir(), basename);
  const thumbFilePath = path.join(uid, 'thumb', basename);

  await bucket.file(imagePath).download({ destination: tempFilePath });
  console.log('Image downloaded locally to', tempFilePath);
  // -thumbnail を指定すると -strip になる
  // -thumbnail 768x768^ で短いほうの辺が768pxの長方形を作る（もともと小さい場合は無視）
  // -gravity center -extent 768x768 で中央だけ切り取る
  await spawn('convert', [
    tempFilePath,
    '-auto-orient',
    '-thumbnail',
    '768x768^',
    '-gravity',
    'center',
    '-extent',
    '768x768',
    tempFilePath,
  ]);
  console.log('Thumbnail created at', tempFilePath);
  await bucket.upload(tempFilePath, { destination: thumbFilePath });
  await fs.unlinkSync(tempFilePath);

  // https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase
  const imageURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${imagePath}?alt=media`;
  const thumbURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${thumbFilePath}?alt=media`;
  const counterRef = db.collection('_counters').doc('photos');
  const photoRef = db.collection('_photos').doc(basename);
  return db.runTransaction(async (transaction) => {
    const photosDoc = await transaction.get(counterRef);
    let count: number;
    if (photosDoc.exists) {
      count = photosDoc.get('count') || 0;
    } else {
      count = 0;
      transaction.set(counterRef, { count });
    }
    count++;
    console.log(`count = ${count}`);
    transaction.update(counterRef, { count });
    transaction.set(photoRef, {
      imageURL,
      thumbURL,
      serial: count,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
});
