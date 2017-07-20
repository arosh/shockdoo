// @flow
import React from 'react';
import { ThumbnailItem } from './ThumbnailItem';

const styles = {
  card: {
    marginBottom: '1em',
  },
};

type TThumbnail = {
  imageUrl: string,
  userId: string,
  uploadedAt: string,
};

type TProps = {
  thumbnails: TThumbnail[],
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
            />
          </div>
        </div>
      )}
    </div>
  );
}
