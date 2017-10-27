// @flow
import * as firebase from 'firebase';
import 'firebase/firestore';

export default class FirebaseUtils {
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;

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

  async signIn(providerName: string) {
    const provider = this.createProvider(providerName);
    const credential: firebase.auth.UserCredential = await this.auth.signInWithPopup(
      provider
    );
    // credential.additionalUserInfo.{username,isNewUser} を使ってユーザー名をセットする
    console.log(credential);
    return {
      userId: -1,
      userName: 'fizzbuzz',
    };
    // const uid = credential.user.uid;
    // const userIdPromise = this.waitValue(`users/${uid}`, 'serial');
    // const userNamePromise = this.waitValue(`users/${uid}`, 'name');
    // const userId: number = await userIdPromise;
    // const userName: string = await userNamePromise;
    // return {
    //   userId,
    //   userName,
    // };
  }

  setOnSignInHandler(observer: (userId: number, userName: string) => void) {
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        console.log(user);
        observer(-1, 'fizzbuzz');
        // User is signed in.
        // const uid = user.uid;
        // const userIdPromise = this.waitValue(`users/${uid}`, 'serial');
        // const userNamePromise = this.waitValue(`users/${uid}`, 'name');
        // const userId: number = await userIdPromise;
        // const userName: string = await userNamePromise;
        // console.log(user);
        // observer(userId, userName);
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

  // waitValue(path: string, childName: string): Promise<any> {
  //   return new Promise(resolve => {
  //     const ref = this.database.ref(path);
  //     const callback = (childSnapshot: firebase.database.DataSnapshot) => {
  //       if (childSnapshot.key === childName) {
  //         ref.off('child_added', callback);
  //         resolve(childSnapshot.val());
  //       }
  //     };
  //     ref.on('child_added', callback);
  //   });
  // }
}

// function waitFor(milliSecond): Promise<void> {
//   return new Promise(resolve => {
//     setTimeout(resolve, milliSecond);
//   });
// }
