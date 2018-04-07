// @flow
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/ThumbCollection';
import { toggleLike, refreshPhotos } from '../reducer';
import type { State } from '../reducer';
import type { Photo } from '../types';

class ThumbCollectionManager extends React.Component<any, {}> {
  UNSAFE_componentWillMount = () => {
    this.props.triggerUpdate(this.props.type, this.props.uid);
  };
  UNSAFE_componentWillReceiveProps = nextProps => {
    if (
      nextProps.type !== this.props.type ||
      nextProps.uid !== this.props.uid
    ) {
      this.props.triggerUpdate(nextProps.type, nextProps.uid);
    }
  };
  render = () => <Component {...this.props} />;
}

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      thumbs: state.photos.map((photo: Photo) => ({
        photoID: photo.photoID,
        thumbURL: photo.thumbURL,
        uid: photo.uid,
        userName: photo.userName,
        createdAt: photo.createdAt,
        star: photo.star,
        likeCount: photo.likes,
        likeMark: state.likes.includes(photo.photoID),
      })),
    }),
    dispatch => ({
      handleLikeClick: (photoID: string) => {
        dispatch(toggleLike(photoID));
      },
      triggerUpdate: (type: string, uid: string) => {
        dispatch(refreshPhotos(type, uid));
      },
      onClickMore: () => {
        console.log('more');
      },
    })
  )
)(ThumbCollectionManager);
