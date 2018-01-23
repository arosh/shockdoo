// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/AddPhotoButton';
import { setSubmit } from '../reducer';
import type { State } from '../reducer';

function createTodayString() {
  const date = new Date();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export default withRouter(
  connect(
    (state: State) => ({
      display: state.logged,
    }),
    (dispatch, ownProps) => ({
      onFileSelect: (file: File) => {
        const blobURL = URL.createObjectURL(file);
        const today = createTodayString();
        dispatch(setSubmit(file.type, blobURL, today));
        const { history } = ownProps;
        history.push('/photos/new');
      },
    })
  )(Component)
);
