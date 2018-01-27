// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/AddPhotoButton';
import { setSubmit } from '../reducer';
import type { State } from '../reducer';

function createTodayString() {
  const date = new Date();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      display: state.uid !== null,
    }),
    (dispatch, ownProps) => ({
      onFileSelect: (file: File) => {
        const blobURL = URL.createObjectURL(file);
        const today = createTodayString();
        dispatch(setSubmit(blobURL, today));
        const { history } = ownProps;
        history.push('/photos/new');
      },
    })
  )
)(Component);
