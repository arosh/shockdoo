// @flow
import * as firebase from 'firebase';

export default class FirebaseUtils {
  constructor() {
    this.initializeApp();
  }
  initializeApp = () => {
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
  };
}
