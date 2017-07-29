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

  signIn(providerName: string) {
    const provider = this.createProvider(providerName);
    return this.auth.signInWithPopup(provider);
  }

  signOut() {
    return this.auth.signOut();
  }
}
