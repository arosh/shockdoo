// @flow
import React from 'react';
import ThumbItem from './ThumbItem';

const styles = {
  card: {
    marginBottom: '1em',
  },
};

// 本当はItemの内容を知っていなくても良い設計にするべきでItemのほうからIDで引けるようにしたほうが良さそう
type ThumbCollectionProps = {
  thumbs: {
    serial: number,
    thumbURL: string,
    userName: string,
    createdAt: string,
    star: number,
    favoriteCount: number,
    favoriteMark: boolean,
  }[],
  handleImageClick: (photoID: number) => void,
  handleFavoriteClick: (photoID: number) => void,
  triggerUpdate: () => void,
};

export default class ThumbCollection extends React.Component<
  ThumbCollectionProps,
  {}
> {
  componentDidMount = () => {
    this.props.triggerUpdate();
  }
  render = () => (
    <div className="row">
      {this.props.thumbs.map((item, key) => (
        <div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
          <div className="box" style={styles.card}>
            <ThumbItem
              {...item}
              handleImageClick={() => this.props.handleImageClick(item.serial)}
              handleFavoriteClick={() =>
                this.props.handleFavoriteClick(item.serial)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
