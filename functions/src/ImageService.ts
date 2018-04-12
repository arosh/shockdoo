import { spawn } from 'child-process-promise';

export async function generateThumbnail(imageLocalPath: string, thumbLocalPath: string) {
  // -thumbnail を指定すると -strip になる
  // -thumbnail 768x768^ で短いほうの辺が768pxの長方形を作る（もともと小さい場合は無視）
  // -gravity center -extent 768x768 で中央だけ切り取る
  console.log(`Start to generate the thumbnail of ${imageLocalPath}`);
  await spawn('convert', [
    imageLocalPath,
    '-auto-orient',
    '-thumbnail',
    '768x768^',
    '-gravity',
    'center',
    '-extent',
    '768x768',
    thumbLocalPath,
  ]);
  console.log(`The thumbnail of ${imageLocalPath} is created at ${thumbLocalPath}`);
}
