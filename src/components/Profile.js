// @flow
import React from 'react';
import ThumbnailCollection from './ThumbnailCollection';
import type { PropsType as ItemType } from './ThumbnailItem';

// export type PropsType = {
//   imageUrl: string,
//   userName: string,
//   uploadedAt: string,
//   starCount: number,
//   favoriteCount: number,
//   favoriteMark: boolean,
//   handleFavoriteClick: () => void,
// };

type PropsType = {
  userName: string,
  recentPhotos: ItemType[],
  recentLikes: ItemType[],
};

export default function Profile(props: PropsType) {
  const { userName, recentPhotos, recentLikes } = props;
  return (
    <div>
      <h1>
        {userName}
      </h1>
      <h2>投稿した写真</h2>
      <ThumbnailCollection thumbnails={recentPhotos} />
      <h2>お気に入り</h2>
      <ThumbnailCollection thumbnails={recentLikes} />
    </div>
  );
}
