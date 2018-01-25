// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from '../components/Detail';
import { refreshPhoto } from '../reducer';
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
      likeMark: state.photo.likeMark,
      likeUsers: state.photo.likeUsers,
      deleteButton: false,
    }),
    (dispatch, ownProps) => ({
      handleLikeClick: (serial: number) => {
        console.log(`serial = ${serial}`);
      },
      onDelete: () => {
        const id = ownProps.id;
        console.log(`delete id = ${id}`);
      },
      triggerRefresh: () => {
        const id = parseInt(ownProps.id, 10);
        dispatch(refreshPhoto(id));
      },
    })
  )(Component)
);
