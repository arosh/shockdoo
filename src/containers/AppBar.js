// @flow
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/AppBar';
import { signIn, signOut, toggleDrawer } from '../reducer';
import type { State } from '../reducer';

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      logged: state.uid !== null,
    }),
    dispatch => ({
      onLeftIconButtonClick: () => dispatch(toggleDrawer(true)),
      onSignIn: (providerName: string) => dispatch(signIn(providerName)),
      onSignOut: () => dispatch(signOut()),
    })
  )
)(Component);
