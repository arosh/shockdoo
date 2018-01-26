// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from '../components/Detail';
import { refreshPhoto, toggleLike } from '../reducer';
import type { State } from '../reducer';

// imageUrl: string,
// userName: string,
// uploadedAt: string,
// starCount: number,
// likeMark: boolean,
// likeUsers: string[],
// handleLikeClick: () => void,
// deleteButton: boolean,
// onDelete?: () => void,
// triggerRefresh: () => void,

export default withRouter(
  connect(
    (state: State) => ({
      imageUrl: state.photo.imageURL,
      userName: state.photo.userName,
      uploadedAt: state.photo.createdAt,
      starCount: state.photo.star,
      likeMark: state.likes.includes(state.photo.photoID),
      likeUsers: state.photo.likeUsers,
      deleteButton: false,
    }),
    (dispatch, ownProps) => ({
      handleLikeClick: (photoID: string) => {
        dispatch(toggleLike(photoID));
      },
      onDelete: (photoID: string) => {
        console.log(`delete photoID = ${photoID}`);
      },
      triggerRefresh: (photoID: string) => {
        dispatch(refreshPhoto(photoID));
      },
    })
  )(Component)
);
