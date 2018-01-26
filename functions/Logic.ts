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

function getUserName(uid: string): Promise<string> {
  return db.collection('users').doc(uid).get().then((snapshot) => snapshot.get('userName'));
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
  const photoRef = db.collection('photos').doc();
  const photoID = photoRef.id;
  const imageBucketPath = path.join('image', photoID + '.' + ImageService.getExtension(mimeType));
  const imageURLPromise = uploadToBucket(imagePath, imageBucketPath, mimeType);
  const thumbBucketPath = path.join('thumb', photoID + '.jpg');
  const thumbURLPromise = uploadToBucket(await thumbPathPromise, thumbBucketPath, 'image/jpeg');
  await photoRef.set({
    uid,
    userName: await userNamePromise,
    star,
    imageURL: await imageURLPromise,
    thumbURL: await thumbURLPromise,
    likes: 0,
    createdAt: FieldValue.serverTimestamp(),
  });
  return photoID;
}

export function setUserName(uid: string, userName: string) {
  console.log(`setUserName(uid = ${uid}, userName = ${userName})`);
  return db.collection('users').doc(uid).set({ userName }, { merge: true });
}

function checkIfPhotoExists(photoID: string) {
  return db.collection('photos')
    .doc(photoID)
    .get()
    .then((snapshot) => snapshot.exists);
}

function findLike(uid: string, photoID: string) {
  return db.collection('likes')
    .where('uid', '==', uid)
    .where('photoID', '==', photoID)
    .get();
}

function checkIfLikeExists(uid: string, photoID: string) {
  return findLike(uid, photoID).then((snapshot) => !snapshot.empty);
}

function countLikes(photoID: string): Promise<number> {
  return db.collection('likes').where('photoID', '==', photoID).get().then((snapshot) => snapshot.size);
}

export async function addLike(uid: string, photoID: string): Promise<boolean> {
  const photoExistsPromise = checkIfPhotoExists(photoID);
  const likeExistsPromise = checkIfLikeExists(uid, photoID);
  const userNamePromise = getUserName(uid);
  if (!(await photoExistsPromise)) {
    return false;
  }
  if (await likeExistsPromise) {
    return false;
  }

  const likesUpdatePromise = db.collection('photos')
    .doc(photoID)
    .update({ likes: await countLikes(photoID) + 1 });
  await db.collection('likes').add({
    uid,
    userName: await userNamePromise,
    photoID,
    createdAt: FieldValue.serverTimestamp(),
  });
  await likesUpdatePromise;
  return true;
}

export async function removeLike(uid: string, photoID: string): Promise<boolean> {
  const querySnapshot = await findLike(uid, photoID);
  if (querySnapshot.empty) {
    return false;
  }
  const likesUpdatePromise = db.collection('photos')
    .doc(photoID)
    .update({ likes: await countLikes(photoID) - 1 });
  const promise = querySnapshot.docs.map((snapshot) => snapshot.ref.delete());
  await Promise.all(promise);
  await likesUpdatePromise;
  return true;
}
