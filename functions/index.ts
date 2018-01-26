import * as functions from 'firebase-functions';

import * as express from 'express';
import * as multer from 'multer';

import * as os from 'os';

import * as logic from './logic';

const app = express();
const maxFileSize = 5242880; // 5MiB
const upload = multer({ dest: os.tmpdir(), limits: { fileSize: maxFileSize } });

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

app.use(authenticate);

app.post('/api/set_user_name', async (req: any, res) => {
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

app.post('/api/add_photo', upload.single('image'), async (req: any, res) => {
  const { uid } = req;
  const star = parseInt(req.body.star, 10);
  if (!(1 <= star && star <= 5)) {
    res.status(400).send('Bad Request');
    return;
  }
  const imagePath = req.file.path;
  const mimeType = req.file.mimetype;
  if (!mimeType.startsWith('image/')) {
    res.status(400).send('Bad Request');
    return;
  }
  const photoID = await logic.addPhoto(uid, star, imagePath, mimeType);
  res.status(200).json({ photoID });
});

exports.api = functions.https.onRequest(app);

exports.onUserCreated = functions.auth.user().onCreate((event) => {
  const uid = event.data.uid;
  return logic.setUserSeq(uid);
});
