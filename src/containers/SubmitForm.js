// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SubmitForm from '../components/SubmitForm';
import { uploadImage } from '../reducer';
import type { State } from '../reducer';

export default withRouter(
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
    })
  )(SubmitForm)
);
