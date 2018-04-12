// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/Detail';
import { refreshPhoto, toggleLike } from '../reducer';
import type { State } from '../reducer';

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      imageUrl: state.photo.imageURL,
      uid: state.photo.uid,
      userName: state.photo.userName,
      uploadedAt: state.photo.createdAt,
      starCount: state.photo.star,
      likeMark: state.likes.includes(state.photo.photoID),
      likeUsers: state.photo.likeUsers,
      deleteButton: false,
    }),
    (dispatch, ownProps) => ({
      handleLikeClick: () => {
        dispatch(toggleLike(ownProps.photoID));
      },
      handleDelete: () => {
        throw new Error(`delete photoID = ${ownProps.photoID}`);
      },
      triggerRefresh: () => {
        dispatch(refreshPhoto(ownProps.photoID));
      },
    })
  )
)(Component);
