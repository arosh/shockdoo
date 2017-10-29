const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

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

exports.generateThumbnail = functions.storage.object().onChange(event => {
  const object = event.data;

  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;
  const resourceState = object.resourceState;
  const metageneration = object.metageneration;

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return null;
  }

  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  if (resourceState === 'exists' && metageneration > 1) {
    console.log('This is a metadata change event.');
    return null;
  }

  const split = filePath.split(path.sep);

  if (split.length !== 3) {
    console.log(`split.length = ${split.length}`);
    return null;
  }

  const [uid, type, basename] = split;
  if (type !== 'origin') {
    console.log(`filePath = ${filePath}`);
    return null;
  }

  if (!contentType.startsWith('image/')) {
    console.log(`contentType = ${contentType}`);
    return null;
  }

  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), basename);
  return bucket
    .file(filePath)
    .download({
      destination: tempFilePath,
    })
    .then(() => {
      console.log('Image downloaded locally to', tempFilePath);
      return spawn('convert', [
        tempFilePath,
        '-thumbnail',
        '768x768^',
        '-gravity',
        'center',
        '-extent',
        '768x768',
        tempFilePath,
      ]);
    })
    .then(() => {
      console.log('Thumbnail created at', tempFilePath);
      const thumbFilePath = path.join(uid, 'thumb', basename);
      return bucket.upload(tempFilePath, { destination: thumbFilePath });
    })
    .then(() => fs.unlinkSync(tempFilePath));
});
