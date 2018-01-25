// @flow
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as shajs from 'sha.js';
import type { Photo } from '../types';

export class FirebaseUtils {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  initializerPromise: Promise<void>;

  constructor() {
    this.initializerPromise = this.initializeApp();
  }

  async initializeApp() {
    // https://firebase.google.com/docs/web/setup
    const resp = await fetch('/__/firebase/init.json');
    const config = await resp.json();
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  createProvider(providerName: string) {
    if (providerName === 'google') {
      // https://firebase.google.com/docs/auth/web/google-signin
      return new firebase.auth.GoogleAuthProvider();
    } else if (providerName === 'twitter') {
      // https://firebase.google.com/docs/auth/web/twitter-login
      return new firebase.auth.TwitterAuthProvider();
    }
    throw new Error(`Cannot find provider: ${providerName}`);
  }

  async signIn(providerName: string): Promise<boolean> {
    await this.initializerPromise;
    const provider = this.createProvider(providerName);
    type UserCredential = firebase.auth.UserCredential;
    const credential: UserCredential = await this.auth.signInWithPopup(
      provider
    );
    const { isNewUser } = credential.additionalUserInfo;
    return isNewUser;
  }

  async signOut(): Promise<void> {
    await this.initializerPromise;
    return this.auth.signOut();
  }

  async setOnSignInHandler(
    handler: (userId: number, userName: string) => void
  ) {
    await this.initializerPromise;
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userID = await this.waitUserSerial(uid);
        const userName = await this.waitUserName(uid);
        handler(userID, userName);
      }
    });
  }

  async setOnSignOutHandler(handler: () => void) {
    await this.initializerPromise;
    this.auth.onAuthStateChanged(async user => {
      if (!user) {
        // User is signed out.
        handler();
      }
    });
  }

  async postJson(url: string, value: any) {
    await this.initializerPromise;
    const token = await this.auth.currentUser.getIdToken();
    const method = 'POST';
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
    const body = JSON.stringify(value);
    const init = {
      method,
      headers,
      body,
    };
    const response = await fetch(url, init);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response);
  }

  async setUserName(userName: string) {
    await this.postJson('/api/set_user_name', { userName });
  }

  async waitUserSerial(uid: string): Promise<number> {
    await this.initializerPromise;
    return new Promise(resolve => {
      const unsubscribe = this.db
        .collection('_users')
        .doc(uid)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            unsubscribe();
            resolve(snapshot.get('serial'));
          }
        });
    });
  }

  async waitUserName(uid: string): Promise<string> {
    await this.initializerPromise;
    return new Promise(resolve => {
      const unsubscribe = this.db
        .collection('users')
        .doc(uid)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            unsubscribe();
            resolve(snapshot.get('name'));
          }
        });
    });
  }

  hashCode(image: ArrayBuffer): string {
    const buf = new Buffer(image);
    return shajs('sha256')
      .update(buf)
      .digest('hex');
  }

  getExtension(mimeType: string): string {
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
  }

  async uploadImage(
    fileType: string,
    image: ArrayBuffer,
    star: number
  ): Promise<number> {
    await this.initializerPromise;
    const { uid } = this.auth.currentUser;
    const hashCode = this.hashCode(image);
    const ext = this.getExtension(fileType);
    const fileName = `${hashCode}.${ext}`;
    const ref = this.storage
      .ref()
      .child(uid)
      .child('image')
      .child(fileName);
    const metadata = {
      contentType: fileType,
    };
    await ref.put(image, metadata);
    await this.db
      .collection('photos')
      .doc(fileName)
      .set({
        userID: uid,
        star: star,
      });
    return this.waitPhoto(fileName);
  }

  async waitPhoto(fileName: string): Promise<number> {
    await this.initializerPromise;
    return new Promise(resolve => {
      const unsubscribe = this.db
        .collection('_photos')
        .doc(fileName)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            unsubscribe();
            resolve(snapshot.get('serial'));
          }
        });
    });
  }

  async getPhotos(): Promise<Photo[]> {
    await this.initializerPromise;
    const snapshots = await this.db
      .collection('_photos')
      .orderBy('createdAt', 'desc')
      .get();
    const usersCache = {};
    const photos: Promise<Photo>[] = snapshots.docs.map(async doc => {
      const photo = await this.db
        .collection('photos')
        .doc(doc.id)
        .get();
      const userID = photo.get('userID');
      let user;
      if (userID in usersCache) {
        user = usersCache[userID];
      } else {
        user = await this.db
          .collection('users')
          .doc(photo.get('userID'))
          .get();
        usersCache[userID] = user;
      }
      const createdAt: Date = doc.get('createdAt');
      const year = createdAt.getFullYear();
      const month = createdAt.getMonth() + 1;
      const date = createdAt.getDate();
      return {
        serial: doc.get('serial'),
        createdAt: `${year}/${month}/${date}`,
        userName: user.get('name'),
        imageURL: doc.get('imageURL'),
        thumbURL: doc.get('thumbURL'),
        star: photo.get('star'),
        favorite: 0,
      };
    });
    return Promise.all(photos);
  }
}

export const singleton = new FirebaseUtils();
