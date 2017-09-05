// @flow
import React from 'react';
import { ThumbnailItem } from './ThumbnailItem';
import type { PropsType as ItemType } from './ThumbnailItem';

const styles = {
  card: {
    marginBottom: '1em',
  },
};

// 本当はItemの内容を知っていなくても良い設計にするべきでItemのほうからIDで引けるようにしたほうが良さそう
type PropsType = {
  thumbnails: ItemType[],
};

export default function ThumbnailCollection(props: PropsType) {
  const { thumbnails } = props;
  return (
    <div className="row">
      {thumbnails.map((item, key) => (
        <div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <div className="box" style={styles.card}>
            <ThumbnailItem {...item} />
          </div>
        </div>
      ))}
    </div>
  );
}
