import * as fs from 'fs';

import * as Busboy from 'busboy';
import * as functions from 'firebase-functions';
import * as tmp from 'tmp-promise';

import * as ImageService from './ImageService';
import * as Logic from './Logic';

const MAX_FILE_SIZE = 5242880; // 5MiB

type AuthenticateHandler = (req: functions.Request, res: functions.Response, uid: string) => void;

// tslint:disable-next-line:max-line-length
// https://github.com/firebase/functions-samples/blob/ad2f47b88609713e9211363d0dccacd0a923472c/authenticated-json-api/functions/index.js#L29
const authenticate = (next: AuthenticateHandler) => (req: functions.Request, res: functions.Response) => {
  const authHeader = req.headers.authorization as string;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.sendStatus(401); // Unauthorized
    return;
  }
  const idToken = authHeader.split('Bearer ')[1];
  Logic.verifyIdToken(idToken).then((decodedIdToken) => {
    const { uid } = decodedIdToken;
    next(req, res, uid);
  }).catch((error) => {
    res.sendStatus(401); // Unauthorized
  });
};

exports.set_user_name = functions.https.onRequest(
  authenticate(async (req, res, uid) => {
    const MAX_LENGTH = 20;
    const userName: string = req.body.userName;
    if (!userName || userName.length > MAX_LENGTH) {
      res.sendStatus(400);
      return;
    }
    await Logic.setUserName(uid, userName);
    res.status(200).json({ ok: true });
  }));

exports.add_photo = functions.https.onRequest(
  authenticate(async (req, res, uid) => {
    const busboy = new Busboy({ headers: req.headers, limits: { fileSize: MAX_FILE_SIZE } });
    const files: any = {};
    const fields: any = {};

    // This callback will be invoked for each file uploaded.
    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
      console.log('busboy.on(file)');
      const option = { postfix: '.' + ImageService.getExtension(mimetype) };
      const filepath: string = await tmp.tmpName(option);
      file.pipe(fs.createWriteStream(filepath));
      files[fieldname] = { path: filepath, type: mimetype };
    });

    busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      console.log('busboy.on(field)');
      fields[fieldname] = val;
    });

    busboy.on('finish', async () => {
      console.log('busboy.on(finish)');
      if (!fields.star || !files.image) {
        console.log(`fields.star = ${fields.star}`);
        console.log(`files.image = ${files.image}`);
        res.sendStatus(400); // Bad Request
        return;
      }
      const star = parseInt(fields.star, 10);
      if (!(1 <= star && star <= 5)) {
        console.log(`fields.star = ${fields.star}`);
        res.sendStatus(400); // Bad Request
        return;
      }
      const file = files.image;
      const imagePath = file.path;
      const mimeType = file.type;
      if (!mimeType.startsWith('image/')) {
        console.log(`mimeType = ${mimeType}`);
        res.sendStatus(400); // Bad Request
        return;
      }
      const photoID = await Logic.addPhoto(uid, star, imagePath, mimeType);
      res.status(200).json({ photoID });
    });
    busboy.end((req as any).rawBody as Buffer);
  }));

exports.add_like = functions.https.onRequest(
  authenticate(async (req, res, uid) => {
    const photoID: string = req.body.photoID;
    const ok = await Logic.addLike(uid, photoID);
    res.status(200).json({ ok });
  }));

exports.remove_like = functions.https.onRequest(
  authenticate(async (req, res, uid) => {
    const photoID: string = req.body.photoID;
    const ok = await Logic.removeLike(uid, photoID);
    res.status(200).json({ ok });
  }));
