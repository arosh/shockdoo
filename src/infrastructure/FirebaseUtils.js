// @flow
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import type { Photo, PhotoDetail } from '../types';

export class FirebaseUtils {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
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

  async waitUserSnapshot(uid: string) {
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

  async setOnSignInHandler(handler: (uid: number, userName: string) => void) {
    await this.initializerPromise;
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const snapshot = await this.waitUserSnapshot(uid);
        const { seq, userName } = snapshot.data();
        handler(seq, userName);
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
    return resp.photoID;
  }

  dateString(at: Date): string {
    const year = at.getFullYear();
    const month = at.getMonth() + 1;
    const date = at.getDate();
    return `${year}/${month}/${date}`;
  }

  async getPhotos(): Promise<Photo[]> {
    await this.initializerPromise;
    const snapshots = await this.db
      .collection('photos')
      .orderBy('createdAt', 'desc')
      .get();
    const photos = snapshots.docs.map(doc => {
      const data = doc.data();
      const photo: Photo = {
        seq: data.seq,
        uid: data.uid,
        userName: data.userName,
        star: data.star,
        imageURL: data.imageURL,
        thumbURL: data.thumbURL,
        createdAt: this.dateString(data.createdAt),
        likes: data.likes,
      };
      return photo;
    });
    return photos;
  }

  async getPhoto(seq: number): Promise<PhotoDetail> {
    await this.initializerPromise;
    const querySnapshot = await this.db
      .collection('photos')
      .where('seq', '==', seq)
      .get();
    if (querySnapshot.empty) {
      throw new Error(`Cannot fetch photo (seq = ${seq})`);
    }
    const data = querySnapshot.docs[0].data();
    return {
      imageURL: data.imageURL,
      uid: data.uid,
      userName: data.userName,
      createdAt: this.dateString(data.createdAt),
      star: data.star,
      likeMark: false,
      likeUsers: [],
    };
  }
}

export const singleton = new FirebaseUtils();
