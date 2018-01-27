import * as functions from 'firebase-functions';
import * as formidable from 'formidable';

import * as logic from './logic';

const MAX_FIELDS_SIZE = 5242880; // 5MiB

// tslint:disable-next-line:max-line-length
// https://github.com/firebase/functions-samples/blob/ad2f47b88609713e9211363d0dccacd0a923472c/authenticated-json-api/functions/index.js#L29
const authenticate = (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  logic.verifyIdToken(idToken).then((decodedIdToken) => {
    req.uid = decodedIdToken.uid;
    next();
  }).catch((error) => {
    res.status(403).send('Unauthorized');
  });
};

exports.set_user_name = functions.https.onRequest((req: any, res) => {
  return new Promise((resolve, reject) => {
    authenticate(req, res, async () => {
      const MAX_LENGTH = 20;
      const { uid } = req;
      const userName: string = req.body.userName;
      if (!userName || userName.length > MAX_LENGTH) {
        res.status(400).send('Bad Request');
        resolve();
        return;
      }
      await logic.setUserName(uid, userName);
      res.status(200).json({ ok: true });
      resolve();
    });
  });
});

exports.add_photo = functions.https.onRequest((req: any, res) => {
  return new Promise((resolve, reject) => {
    authenticate(req, res, () => {
      const { uid } = req;
      const form = new formidable.IncomingForm();
      form.maxFieldsSize = MAX_FIELDS_SIZE;
      form.parse(req, async (err, fields, files) => {
        const f = async () => {
          console.log('form.parse');
          if (!fields.star || !files.image) {
            console.log(`fields.star = ${fields.star}`);
            console.log(`files.image = ${files.image}`);
            res.status(400).send('Bad Request');
            return;
          }
          const star = parseInt(fields.star, 10);
          if (!(1 <= star && star <= 5)) {
            console.log(`fields.star = ${fields.star}`);
            res.status(400).send('Bad Request');
            return;
          }
          const file = files.image;
          const imagePath = file.path;
          const mimeType = file.type;
          if (!mimeType.startsWith('image/')) {
            console.log(`mimeType = ${mimeType}`);
            res.status(400).send('Bad Request');
            return;
          }
          const photoID = await logic.addPhoto(uid, star, imagePath, mimeType);
          res.status(200).json({ photoID });
        };
        await f();
        resolve();
      });
    });
  });
});

exports.add_like = functions.https.onRequest((req: any, res) => {
  return new Promise((resolve, reject) => {
    authenticate(req, res, async () => {
      const { uid } = req;
      const photoID = req.body.photoID;
      const ok = await logic.addLike(uid, photoID);
      res.status(200).json({ ok });
      resolve();
    });
  });
});

exports.remove_like = functions.https.onRequest((req: any, res) => {
  return new Promise((resolve, reject) => {
    authenticate(req, res, async () => {
      const { uid } = req;
      const photoID = req.body.photoID;
      const ok = await logic.removeLike(uid, photoID);
      res.status(200).json({ ok });
      resolve();
    });
  });
});
