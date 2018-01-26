// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from '../components/ThumbCollection';
import { toggleLike, refreshPhotos } from '../reducer';
import type { State } from '../reducer';
import type { Photo } from '../types';

export default withRouter(
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
    (dispatch, ownProps) => ({
      handleImageClick: (photoID: number) => {
        const { history } = ownProps;
        history.push(`/photos/${photoID}`);
      },
      handleLikeClick: (photoID: string) => {
        dispatch(toggleLike(photoID));
      },
      triggerUpdate: () => {
        dispatch(refreshPhotos());
      },
      onClickMore: () => {
        console.log('more');
      },
    })
  )(Component)
);
