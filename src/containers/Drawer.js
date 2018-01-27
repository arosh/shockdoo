// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/Drawer';
import { toggleDrawer, signIn, signOut } from '../reducer';
import type { State } from '../reducer';

export default withRouter(
  connect(
    (state: State) => ({
      logged: state.uid !== null,
      open: state.drawerOpened,
      uid: state.uid,
    }),
    dispatch => ({
      onRequestChange: open => dispatch(toggleDrawer(open)),
      onClick: (name: string) => {
        dispatch(toggleDrawer(false));
        switch (name) {
          case 'signin-twitter':
            dispatch(signIn('twitter'));
            break;
          case 'signin-google':
            dispatch(signIn('google'));
            break;
          case 'signout':
            dispatch(signOut());
            break;
          default:
            throw new Error(`Unknown name = ${name}`);
        }
      },
    })
  )(Component)
);
