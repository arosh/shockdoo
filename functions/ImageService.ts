import { spawn } from 'child-process-promise';
import * as tmp from 'tmp-promise';

export async function generateThumbnail(imagePath: string) {
  const thumbPath: string = await tmp.tmpName({ postfix: '.jpg' });
  // -thumbnail を指定すると -strip になる
  // -thumbnail 768x768^ で短いほうの辺が768pxの長方形を作る（もともと小さい場合は無視）
  // -gravity center -extent 768x768 で中央だけ切り取る
  await spawn('convert', [
    imagePath,
    '-auto-orient',
    '-thumbnail',
    '768x768^',
    '-gravity',
    'center',
    '-extent',
    '768x768',
    thumbPath,
  ]);
  console.log('Thumbnail created at', thumbPath);
  return thumbPath;
}

export function getExtension(mimeType: string): string {
  switch (mimeType) {
    case 'image/gif':
      return 'gif';
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    default:
      throw new Error(`Unknown MIME type: ${mimeType}`);
  }
}
