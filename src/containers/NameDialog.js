// @flow
import { connect } from 'react-redux';
import Component from '../components/NameDialog';
import { setUserName } from '../reducer';
import type { State } from '../reducer';

export default connect(
  (state: State) => ({
    open: state.nameDialogOpen,
  }),
  dispatch => ({
    onSubmit: (userName: string) => dispatch(setUserName(userName)),
  })
)(Component);
