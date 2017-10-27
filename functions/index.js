const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.assignUserId = functions.auth.user().onCreate(event => {
  const uid = event.data.uid;
  console.log(`uid = ${uid}`);
  const metaRef = db.collection('meta').doc('users');
  const userRef = db.collection('users').doc(uid);
  return db.runTransaction(transaction => {
    return transaction
      .get(metaRef)
      .then(metaDoc => {
        let counter;
        if (metaDoc.exists) {
          counter = metaDoc.get('counter') || 0;
        } else {
          counter = 0;
          transaction.set(metaRef, { counter });
        }
        return counter + 1;
      })
      .then(counter => {
        console.log(`counter = ${counter}`);
        transaction.update(metaRef, { counter: counter });
        transaction.set(userRef, { serial: counter });
      });
  });
});
