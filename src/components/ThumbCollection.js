// @flow
import React from 'react';
import ThumbItem from './ThumbItem';

const styles = {
  card: {
    marginBottom: '1em',
  },
};

// 本当はItemの内容を知っていなくても良い設計にするべきでItemのほうからIDで引けるようにしたほうが良さそう
type PropTypes = {
  thumbs: {
    photoID: string,
    thumbURL: string,
    uid: string,
    userName: string,
    createdAt: string,
    star: number,
    likeCount: number,
    likeMark: boolean,
  }[],
  handleLikeClick: (photoID: string) => void,
};

const ThumbCollection = ({ thumbs, handleLikeClick }: PropTypes) => (
  <div>
    <div className="row">
      {thumbs.map(item => (
        <div
          key={item.photoID}
          className="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        >
          <div className="box" style={styles.card}>
            <ThumbItem
              {...item}
              handleLikeClick={() => handleLikeClick(item.photoID)}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ThumbCollection;
