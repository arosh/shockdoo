// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from '../components/ThumbCollection';
import { refreshPhotos } from '../reducer';
import type { State } from '../reducer';
import type { Photo } from '../types';

export default withRouter(
  connect(
    (state: State) => ({
      thumbs: state.photos.map((photo: Photo) => ({
        serial: photo.id,
        thumbURL: photo.thumbURL,
        userName: photo.userName,
        createdAt: photo.createdAt,
        star: photo.star,
        likeCount: photo.likes,
        likeMark: false,
      })),
    }),
    (dispatch, ownProps) => ({
      handleImageClick: (id: number) => {
        const { history } = ownProps;
        history.push(`/photos/${id}`);
      },
      handleLikeClick: (serial: number) => {
        console.log(`serial = ${serial}`);
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
