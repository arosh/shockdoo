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

exports.set_user_name = functions.https.onRequest(async (req: any, res) => {
  authenticate(req, res, async () => {
    const MAX_LENGTH = 20;
    const { uid } = req;
    const userName: string = req.body.userName;
    if (!userName || userName.length > MAX_LENGTH) {
      res.status(400).send('Bad Request');
      return;
    }
    await logic.setUserName(uid, userName);
    res.status(200).json({ ok: true });
  });
});

exports.add_photo = functions.https.onRequest(async (req: any, res) => {
  console.log('authenticate');
  authenticate(req, res, async () => {
    console.log('in authenticate');
    const { uid } = req;
    const form = new formidable.IncomingForm();
    form.maxFieldsSize = MAX_FIELDS_SIZE;
    console.log('form.parse');
    form.parse(req, async (err, fields, files) => {
      if (!fields.star || !files.image) {
        res.status(400).send('Bad Request');
        return;
      }
      const star = parseInt(fields.star, 10);
      if (!(1 <= star && star <= 5)) {
        res.status(400).send('Bad Request');
        return;
      }
      const file = files.image;
      const imagePath = file.path;
      const mimeType = file.type;
      if (!mimeType.startsWith('image/')) {
        res.status(400).send('Bad Request');
        return;
      }
      const photoID = await logic.addPhoto(uid, star, imagePath, mimeType);
      res.status(200).json({ photoID });
    });
  });
});

exports.add_like = functions.https.onRequest(async (req: any, res) => {
  authenticate(req, res, async () => {
    const uid = req.uid;
    const photoID = req.body.photoID;
    const ok = await logic.addLike(uid, photoID);
    res.status(200).json({ ok });
  });
});

exports.remove_like = functions.https.onRequest(async (req: any, res) => {
  authenticate(req, res, async () => {
    const uid = req.uid;
    const photoID = req.body.photoID;
    const ok = await logic.removeLike(uid, photoID);
    res.status(200).json({ ok });
  });
});
