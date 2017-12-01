import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
admin.initializeApp(functions.config().firebase);
import * as googleCloudStorage from '@google-cloud/storage';
const gcs = googleCloudStorage({
  keyFilename: 'shockdoo-9e83d-firebase-adminsdk-avb1v-d5c1b8ab7b.json',
});
import { spawn } from 'child-process-promise';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

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
      // さすがに0が書き込まれていることは仮定してもいいような気もする…
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

  const fileBucket = object.bucket;
  const filePath = object.name;
  const { contentType, resourceState, metageneration } = object;

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.');
    return;
  }

  const split = filePath.split(path.sep);

  if (split.length !== 3) {
    console.log(`path match failed (filePath = ${filePath})`);
    return;
  }

  const [uid, type, basename] = split;
  if (type !== 'image') {
    console.log(`path match failed (filePath = ${filePath})`);
    return;
  }

  if (!contentType.startsWith('image/')) {
    console.log(`contentType match failed (contentType = ${contentType})`);
    return;
  }

  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), basename);
  const thumbFilePath = path.join(uid, 'thumb', basename);

  await bucket.file(filePath).download({ destination: tempFilePath });
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

  const imageFile = bucket.file(filePath);
  const thumbFile = bucket.file(thumbFilePath);
  const config = {
    action: 'read',
    expires: '03-09-2491',
  };
  const imageURLPromise = imageFile.getSignedUrl(config);
  const thumbURLPromise = thumbFile.getSignedUrl(config);
  // GetSignedUrlResponse は要素数1の配列
  // https://cloud.google.com/nodejs/docs/reference/storage/1.4.x/global#GetSignedUrlResponse
  const imageURL = (await imageURLPromise)[0];
  const thumbURL = (await thumbURLPromise)[0];
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
