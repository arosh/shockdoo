const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const { FieldValue } = admin.firestore;

exports.createUser = functions.auth.user().onCreate(event => {
  const uid = event.data.uid;
  console.log(`uid = ${uid}`);
  const counterRef = db.collection('_counters').doc('users');
  const userRef = db.collection('_users').doc(uid);
  return db.runTransaction(transaction => {
    return transaction
      .get(counterRef)
      .then(usersDoc => {
        let count;
        if (usersDoc.exists) {
          count = usersDoc.get('count') || 0;
        } else {
          count = 0;
          transaction.set(counterRef, { count: count });
        }
        return count + 1;
      })
      .then(count => {
        console.log(`count = ${count}`);
        transaction.update(counterRef, { count: count });
        transaction.set(userRef, {
          serial: count,
          createdAt: FieldValue.serverTimestamp(),
        });
      });
  });
});
