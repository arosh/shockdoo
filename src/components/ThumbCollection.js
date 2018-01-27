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
    userName: string,
    createdAt: string,
    star: number,
    likeCount: number,
    likeMark: boolean,
  }[],
  handleLikeClick: (photoID: string) => void,
  onClickMore: () => void,
};

class ThumbCollection extends React.Component<PropTypes, {}> {
  render = () => (
    <div>
      <div className="row">
        {this.props.thumbs.map((item, key) => (
          <div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="box" style={styles.card}>
              <ThumbItem
                {...item}
                handleLikeClick={() => this.props.handleLikeClick(item.photoID)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThumbCollection;
