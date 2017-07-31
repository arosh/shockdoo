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
  recentPhotos: []ItemType,
  recentLikes: []ItemType,
};

export default function Profile(props: PropsType) {
  const {userName} = props;
  return (
    <div>
      {userName}
    </div>
  );
}
