// @flow
import React from 'react';
import ThumbItem from './ThumbItem';
import MoreButton from './MoreButton';

const styles = {
  card: {
    marginBottom: '1em',
  },
};

// 本当はItemの内容を知っていなくても良い設計にするべきでItemのほうからIDで引けるようにしたほうが良さそう
type Props = {
  thumbs: {
    seq: number,
    thumbURL: string,
    userName: string,
    createdAt: string,
    star: number,
    likeCount: number,
    likeMark: boolean,
  }[],
  handleImageClick: (seq: number) => void,
  handleLikeClick: (seq: number) => void,
  triggerUpdate: () => void,
  onClickMore: () => void,
};

class ThumbCollection extends React.Component<Props, {}> {
  componentWillMount = () => {
    this.props.triggerUpdate();
  };
  render = () => (
    <div>
      <div className="row">
        {this.props.thumbs.map((item, key) => (
          <div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <div className="box" style={styles.card}>
              <ThumbItem
                {...item}
                handleImageClick={() =>
                  this.props.handleImageClick(item.seq)
                }
                handleLikeClick={() => this.props.handleLikeClick(item.seq)}
              />
            </div>
          </div>
        ))}
      </div>
      <MoreButton onClick={this.props.onClickMore} />
    </div>
  );
}

export default ThumbCollection;
