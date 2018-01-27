// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from '../components/AppBar';
import { signIn, signOut, toggleDrawer } from '../reducer';
import type { State } from '../reducer';

export default withRouter(
  connect(
    (state: State) => ({
      logged: state.uid !== null,
    }),
    (dispatch, ownProps) => ({
      onLeftIconButtonClick: () => dispatch(toggleDrawer(true)),
      onSignIn: (providerName: string) => dispatch(signIn(providerName)),
      onSignOut: () => dispatch(signOut()),
    })
  )(Component)
);
