import * as fs from 'fs';

import * as functions from 'firebase-functions';
import * as pathMatch from 'path-match';

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

exports.prepare_photo = functions.https.onRequest(
  authenticate(async (req, res, uid) => {
    const star: number = Math.trunc(req.body.star);
    if (!(1 <= star && star <= 5)) {
      console.log(`req.body.star = ${req.body.star}`);
      res.sendStatus(400); // Bad Request
      return;
    }
    const photoID = await Logic.preparePhoto(uid, star);
    res.status(200).json({ photoID });
  }));

exports.generateThumbnail = functions.storage.object().onChange(async (event) => {
  const object = event.data;
  // move of delete
  if (object.resourceState === 'not_exists') {
    console.log(`resourceState = ${object.resourceState}`);
    return;
  }
  // metadata change
  if (object.resourceState === 'exists' && object.metageneration > 1) {
    console.log(`resourceState = ${object.resourceState} and metageneration = ${object.metageneration}`);
    return;
  }
  if (!object.contentType.startsWith('image/')) {
    console.log(`contentType = ${object.contentType}`);
    return;
  }
  // sensitive : case sensitive (default: false)
  // strict : does not ignore the trailing slash (default: false)
  // end : add '$' to end of RegExp
  const matchOptions = { sensitive: true, strict: true, end: true };
  const match = pathMatch(matchOptions)(':uid/:photoID/image/:basename');
  const params = match(object.name);
  if (params === false) {
    console.log(`object.name = ${object.name}`);
    return;
  }
  const { uid, photoID, basename } = params;
  const imagePath = object.name;
  const thumbPath = `${uid}/${photoID}/thumb/${basename + '.jpg'}`;
  await Logic.generateThumbnail(photoID, imagePath, thumbPath);
  await Logic.completePhoto(photoID, imagePath, thumbPath);
});

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
