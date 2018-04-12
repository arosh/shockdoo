import { DocumentReference, Transaction } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import * as os from 'os';
import * as path from 'path';

import * as ImageService from './ImageService';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const { FieldValue } = admin.firestore;

export function verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
  return admin.auth().verifyIdToken(idToken);
}

async function getUserName(uid: string): Promise<string> {
  const user = await db.collection('users').doc(uid).get();
  return user.get('userName');
}

async function downloadToLocal(bucketPath: string, localPath: string) {
  console.log(`Download ${bucketPath} -> ${localPath}`);
  const bucket = admin.storage().bucket();
  await bucket.file(bucketPath).download({ destination: localPath });
}

async function uploadToBucket(localPath: string, bucketPath: string, contentType: string) {
  console.log(`Upload ${localPath} -> ${bucketPath}`);
  const bucket = admin.storage().bucket();
  // https://firebase.google.com/docs/reference/js/firebase.storage.UploadMetadata?hl=ja
  const metadata = {
    cacheControl: 'public, max-age=3600',
    contentType,
  };
  await bucket.upload(localPath, { destination: bucketPath, metadata });
}

export async function preparePhoto(uid: string, star: number) {
  console.log(`reservePhoto(uid = ${uid}, star = ${star})`);
  const userNamePromise = getUserName(uid);
  const photoRef = db.collection('photos').doc();
  const photoID = photoRef.id;
  await photoRef.set({
    uid,
    userName: await userNamePromise,
    star,
    likes: 0,
    createdAt: FieldValue.serverTimestamp(),
    presence: false,
  });
  return photoID;
}

export async function generateThumbnail(photoID: string, imagePath: string, thumbPath: string) {
  console.log(`generateThumbnail(photoID = ${photoID}, imagePath = ${imagePath}, thumbPath = ${thumbPath})`);
  const imageLocalPath = path.join(os.tmpdir(), path.basename(imagePath));
  const thumbLocalPath = path.join(os.tmpdir(), path.basename(thumbPath));

  await downloadToLocal(imagePath, imageLocalPath);
  await ImageService.generateThumbnail(imageLocalPath, thumbLocalPath);
  await uploadToBucket(thumbLocalPath, thumbPath, 'image/jpeg');
}

export function makePublicUrl(bucketPath: string) {
  const bucket = admin.storage().bucket();
  // https://stackoverflow.com/questions/42956250/get-download-url-from-file-uploaded-with-cloud-functions-for-firebase
  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(bucketPath)}?alt=media`;
}

export async function completePhoto(photoID: string, imagePath: string, thumbPath: string) {
  const imageURL = makePublicUrl(imagePath);
  const thumbURL = makePublicUrl(thumbPath);
  await db.collection('photos').doc(photoID).update({
    imageURL,
    thumbURL,
    presence: true,
  });
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
