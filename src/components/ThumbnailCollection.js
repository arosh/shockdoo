// @flow
import React from 'react';
import { ThumbnailItem } from './ThumbnailItem';

const styles = {
  card: {
    marginBottom: '1em',
  },
};

type TThumbnailItem = {
  imageUrl: string,
  userId: string,
  uploadedAt: string,
  star: number,
};

type TProps = {
  thumbnails: TThumbnailItem[],
};

export function ThumbnailCollection(props: TProps) {
  const { thumbnails } = props;
  return (
    <div className="row">
      {thumbnails.map((item, key) =>
        <div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <div className="box" style={styles.card}>
            <ThumbnailItem
              imageUrl={item.imageUrl}
              userId={item.userId}
              uploadedAt={item.uploadedAt}
              star={item.star}
            />
          </div>
        </div>
      )}
    </div>
  );
}
