// @flow
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as crypto from 'crypto';
import * as mime from 'mime/lite';

export default class FirebaseUtils {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAkjmUZfCpKYP6i5OLhYlxBBHeJvF05OMQ',
      authDomain: 'shockdoo-9e83d.firebaseapp.com',
      projectId: 'shockdoo-9e83d',
      storageBucket: 'shockdoo-9e83d.appspot.com',
    };
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
    const provider = this.createProvider(providerName);
    type UserCredential = firebase.auth.UserCredential;
    const credential: UserCredential = await this.auth.signInWithPopup(
      provider
    );
    const { isNewUser } = credential.additionalUserInfo;
    return isNewUser;
  }

  setOnSignInHandler(observer: (userId: number, userName: string) => void) {
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid } = user;
        const userID = await this.waitUserSerial(uid);
        const userName = await this.waitUserName(uid);
        observer(userID, userName);
      }
    });
  }

  setOnSignOutHandler(observer: () => void) {
    this.auth.onAuthStateChanged(async user => {
      if (!user) {
        // User is signed out.
        observer();
      }
    });
  }

  signOut() {
    return this.auth.signOut();
  }

  async setUserName(userName: string) {
    const { uid } = this.auth.currentUser;
    await this.db
      .collection('users')
      .doc(uid)
      .set({ name: userName });
  }

  hashCode(image: ArrayBuffer): string {
    const buf = new Buffer(image);
    const hash = crypto.createHash('sha256');
    hash.update(buf);
    return hash.digest('hex');
  }

  async uploadImage(fileType: string, image: ArrayBuffer, star: number) {
    const uid = this.auth.currentUser.uid;
    const hashCode = this.hashCode(image);
    const ext = mime.getExtension(fileType);
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
  }

  async waitUserSerial(uid: string): Promise<number> {
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
}
