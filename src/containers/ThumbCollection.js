// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from '../components/ThumbCollection';
import { updatePhotos } from '../reducer';
import type { State } from '../reducer';
import type { Photo } from '../types';

export default withRouter(
  connect(
    (state: State) => ({
      thumbs: state.photos.map((photo: Photo) => ({
        serial: photo.serial,
        thumbURL: photo.thumbURL,
        userName: photo.userName,
        createdAt: photo.createdAt,
        star: photo.star,
        favoriteCount: photo.favorite,
        favoriteMark: false,
      })),
    }),
    (dispatch, ownProps) => ({
      handleImageClick: (serial: number) => {
        console.log(`click serial = ${serial}`);
      },
      handleFavoriteClick: (serial: number) => {
        console.log(`like serial = ${serial}`);
      },
      triggerUpdate: () => {
        dispatch(updatePhotos());
      },
    })
  )(Component)
);
