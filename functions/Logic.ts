import { DocumentReference, Transaction } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import * as fs from 'fs';
import * as path from 'path';

import * as ImageService from './ImageService';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const { FieldValue } = admin.firestore;

export function verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
  return admin.auth().verifyIdToken(idToken);
}

async function increment(transaction: Transaction, ref: DocumentReference): Promise<number> {
  const snapshot = await transaction.get(ref);
  let value: number;
  if (snapshot.exists) {
    value = snapshot.get('value') || 0;
  } else {
    value = 0;
  }
  console.log(`increment ${value} -> ${value + 1}`);
  value++;
  transaction.set(ref, { value });
  return value;
}

async function getUserName(uid: string) {
  const user = await db.collection('users').doc(uid).get();
  return user.get('userName');
}

async function uploadToBucket(localPath: string, bucketPath: string, contentType: string) {
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
}

export async function addPhoto(uid: string, star: number, imagePath: string, mimeType: string) {
  console.log(`addPhoto(uid = ${uid}, star = ${star}, imagePath = ${imagePath}, mimeType = ${mimeType})`);
  const userNamePromise = getUserName(uid);
  const thumbPathPromise = ImageService.generateThumbnail(imagePath);
  const photosSeqRef = db.collection('_seq').doc('photos');
  const photoRef = db.collection('photos').doc();
  const photoID = photoRef.id;
  const imageBucketPath = path.join('image', photoID + '.' + ImageService.getExtension(mimeType));
  const imageURLPromise = uploadToBucket(imagePath, imageBucketPath, mimeType);
  const thumbBucketPath = path.join('thumb', photoID + '.jpg');
  const thumbURLPromise = uploadToBucket(await thumbPathPromise, thumbBucketPath, 'image/jpeg');
  await db.runTransaction(async (transaction) => {
    const seq = await increment(transaction, photosSeqRef);
    transaction.set(photoRef, {
      seq,
      uid,
      userName: await userNamePromise,
      star,
      imageURL: await imageURLPromise,
      thumbURL: await thumbURLPromise,
      likes: 0,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
  return photoID;
}

export function setUserName(uid: string, userName: string) {
  console.log(`setUserName(uid = ${uid}, userName = ${userName})`);
  return db.collection('users').doc(uid).set({ userName }, { merge: true });
}

export function setUserSeq(uid: string) {
  console.log(`setUserSeq(uid = ${uid})`);
  const usersSeqRef = db.collection('_seq').doc('users');
  const userRef = db.collection('users').doc(uid);
  return db.runTransaction(async (transaction) => {
    const seq = await increment(transaction, usersSeqRef);
    transaction.set(userRef, {
      seq,
      createdAt: FieldValue.serverTimestamp(),
    }, { merge: true });
  });
}
