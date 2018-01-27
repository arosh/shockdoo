// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/SubmitForm';
import { uploadImage, hideLoading } from '../reducer';
import type { State } from '../reducer';

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      userName: state.userName,
      imageUrl: state.submit.imageURL,
      createdAt: state.submit.createdAt,
    }),
    (dispatch, ownProps) => ({
      onSubmit: (star: number) => {
        const { history } = ownProps;
        dispatch(uploadImage(star));
        history.push('/');
      },
      hideLoading: () => dispatch(hideLoading()),
    })
  )
)(Component);
