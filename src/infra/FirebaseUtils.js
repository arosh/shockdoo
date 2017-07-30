// @flow
import * as firebase from 'firebase';

export default class FirebaseUtils {
  auth: firebase.auth.Auth;
  database: firebase.database.Database;

  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyAkjmUZfCpKYP6i5OLhYlxBBHeJvF05OMQ',
      authDomain: 'shockdoo-9e83d.firebaseapp.com',
      databaseURL: 'https://shockdoo-9e83d.firebaseio.com',
      projectId: 'shockdoo-9e83d',
      storageBucket: 'shockdoo-9e83d.appspot.com',
      messagingSenderId: '1071573176486',
    };
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.database = firebase.database();
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
    // ユーザーIDを返すようにしないとやばい
    // ついでに新規ユーザーかどうかのチェックが必要
    // functionsにユーザー追加時のイベントを追加してIDの作成とnewcomer=trueをセット
    // ユーザー名がセットされるときにnewcomer=falseをセット
    // 問題は作成されたIDの読み取り
    const credential: firebase.auth.UserCredential = await this.auth.signInWithPopup(
      provider
    );
    const uid = credential.user.uid;
    const userIdPromise = this.waitValue(`users/${uid}`, 'serial');
    const userNamePromise = this.waitValue(`users/${uid}`, 'name');
    const userId: number = await userIdPromise;
    const userName: string = await userNamePromise;
    return {
      userId,
      userName,
    };
  }

  setOnSignIn(observer: (userId: number, userName: string) => void) {
    this.auth.onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        const userIdPromise = this.waitValue(`users/${uid}`, 'serial');
        const userNamePromise = this.waitValue(`users/${uid}`, 'name');
        const userId: number = await userIdPromise;
        const userName: string = await userNamePromise;
        observer(userId, userName);
      }
    });
  }

  setOnSignOut(observer: () => void) {
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

  waitValue(path: string, childName: string) {
    return new Promise(resolve => {
      const ref = this.database.ref(path);
      const callback = (childSnapshot: firebase.database.DataSnapshot) => {
        if (childSnapshot.key === childName) {
          ref.off('child_added', callback);
          resolve(childSnapshot.val());
        }
      };
      ref.on('child_added', callback);
    });
  }
}

// function waitFor(milliSecond): Promise<void> {
//   return new Promise(resolve => {
//     setTimeout(resolve, milliSecond);
//   });
// }
