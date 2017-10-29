// @flow
import { connect } from 'react-redux';

import SubmitForm from '../components/SubmitForm';
import { uploadImage } from '../reducer';
import type { State } from '../reducer';

export default connect(
  (state: State) => ({
    userName: state.userName,
    imageUrl: state.submit.imageURL,
    createdAt: state.submit.createdAt,
  }),
  dispatch => ({
    onSubmit: (star: number) => {
      dispatch(uploadImage(star));
    },
  })
)(SubmitForm);
