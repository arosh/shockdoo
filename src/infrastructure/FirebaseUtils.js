// @flow
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import type { Photo, PhotoDetail, User } from '../types';

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

  async setOnSignInHandler(handler: (uid: number, userName: string) => void) {
    await this.initializerPromise;
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userSnapshot = await this.db
          .collection('users')
          .doc(uid)
          .get();
        const userName = userSnapshot.get('userName');
        handler(uid, userName);
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
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
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

  async getPhotosRoot(): Promise<Photo[]> {
    await this.initializerPromise;
    const snapshots = await this.db
      .collection('photos')
      .orderBy('createdAt', 'desc')
      .get();
    const photos = snapshots.docs.map(doc => {
      const data = doc.data();
      const photo: Photo = {
        photoID: doc.id,
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

  async getPhotosUser(uid: string): Promise<Photo[]> {
    await this.initializerPromise;
    const snapshots = await this.db
      .collection('photos')
      .where('uid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();
    const photos = snapshots.docs.map(doc => {
      const data = doc.data();
      const photo: Photo = {
        photoID: doc.id,
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

  async getPhotosUserLikes(uid: string): Promise<Photo[]> {
    await this.initializerPromise;
    const snapshots = await this.db
      .collection('likes')
      .where('uid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();
    const photosPromise = snapshots.docs.map(like =>
      this.db
        .collection('photos')
        .doc(like.get('photoID'))
        .get()
    );
    const photos = await Promise.all(photosPromise);
    return photos.map(doc => {
      const data = doc.data();
      const photo: Photo = {
        photoID: doc.id,
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
  }

  async getPhoto(photoID: string): Promise<PhotoDetail> {
    await this.initializerPromise;
    const photoPromise = this.db
      .collection('photos')
      .doc(photoID)
      .get();
    const likesPromise = this.db
      .collection('likes')
      .where('photoID', '==', photoID)
      .orderBy('createdAt', 'desc')
      .get();
    const photoSnapshot = await photoPromise;
    if (!photoSnapshot.exists) {
      throw new Error(`Cannot fetch photoID = ${photoID}`);
    }
    const photo = photoSnapshot.data();
    const likesSnapshot = await likesPromise;
    const likeUsers: User[] = likesSnapshot.docs.map(snapshot => {
      const like = snapshot.data();
      return { uid: like.uid, userName: like.userName };
    });
    return {
      photoID: photoSnapshot.id,
      imageURL: photo.imageURL,
      uid: photo.uid,
      userName: photo.userName,
      createdAt: this.dateString(photo.createdAt),
      star: photo.star,
      likeUsers,
    };
  }

  async getLikes(): Promise<string[]> {
    await this.initializerPromise;
    if (this.auth.currentUser) {
      const { uid } = this.auth.currentUser;
      const snapshot = await this.db
        .collection('likes')
        .where('uid', '==', uid)
        .orderBy('createdAt', 'desc')
        .get();
      return snapshot.docs.map(like => like.get('photoID'));
    }
    return [];
  }

  async addLike(photoID: string) {
    this.postJson('/api/add_like', { photoID });
  }

  async removeLike(photoID: string) {
    this.postJson('/api/remove_like', { photoID });
  }
}

export const singleton = new FirebaseUtils();
