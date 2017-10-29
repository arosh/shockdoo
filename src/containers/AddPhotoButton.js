// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/AddPhotoButton';
import { setSubmit } from '../reducer';

function createTodayString() {
  const date = new Date();
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

export default withRouter(
  connect(null, (dispatch, ownProps) => ({
    onFileSelect: fileForm => {
      // https://qiita.com/minodisk/items/24e253bb9f2313621a6b
      const file: File = fileForm.files[0];
      if (!file) {
        return;
      }
      const today = createTodayString();
      const blobURL = URL.createObjectURL(file);
      dispatch(setSubmit(file.type, blobURL, today));
      const { history } = ownProps;
      history.push('/submit');
    },
  }))(Component)
);
