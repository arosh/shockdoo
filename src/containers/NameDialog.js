// @flow
import { connect } from 'react-redux';
import Component from '../components/NameDialog';
import { nameDialogSubmit } from '../reducer';
import type { State } from '../reducer';

export default connect(
  (state: State) => ({
    open: state.nameDialogOpen,
  }),
  dispatch => ({
    onSubmit: (name: string) => dispatch(nameDialogSubmit(name)),
  })
)(Component);
