// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/AddPhotoButton';
import { setSubmit } from '../reducer';
import type { State } from '../reducer';

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      display: state.uid !== null,
    }),
    (dispatch, ownProps) => ({
      onFileSelect: (file: File) => {
        const fileName = file.name;
        const blobURL = URL.createObjectURL(file);
        dispatch(setSubmit(fileName, blobURL));
        const { history } = ownProps;
        history.push('/photos/new');
      },
    })
  )
)(Component);
