// @flow
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
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
        const userSnapshot = await this.waitUserSnapshot(uid);
        const { id, userName } = userSnapshot.data();
        handler(id, userName);
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

  async waitUserSnapshot(
    uid: string
  ): Promise<firebase.firestore.DocumentSnapshot> {
    await this.initializerPromise;
    return new Promise(resolve => {
      const unsubscribe = this.db
        .collection('users')
        .doc(uid)
        .onSnapshot(snapshot => {
          if (snapshot.exists) {
            unsubscribe();
            resolve(snapshot);
          }
        });
    });
  }

  async postFormData(url: string, body: FormData) {
    await this.initializerPromise;
    const token = await this.auth.currentUser.getIdToken();
    const method = 'POST';
    const headers = {
      Authorization: 'Bearer ' + token,
    };
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

  async uploadImage(image: Blob, star: number): Promise<string> {
    await this.initializerPromise;
    const formData = new FormData();
    formData.set('star', star.toFixed());
    formData.set('image', image);
    const resp = await this.postFormData('/api/add_photo', formData);
    return resp.id;
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
