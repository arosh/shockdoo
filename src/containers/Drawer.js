// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Component from '../components/Drawer';
import { toggleDrawer, signIn, signOut } from '../reducer';
import type { State } from '../reducer';

export default withRouter(
  connect(
    (state: State) => ({
      logged: state.logged,
      open: state.drawerOpened,
      uid: state.uid,
    }),
    (dispatch, ownProps) => ({
      onRequestChange: open => dispatch(toggleDrawer(open)),
      onClick: (name: string, uid?: number) => {
        const { history } = ownProps;
        dispatch(toggleDrawer(false));
        switch (name) {
          case 'home':
            history.push('/');
            break;
          case 'photos':
            if (uid === undefined) {
              throw new Error('uid is undefined');
            }
            history.push(`/users/${uid}/photos`);
            break;
          case 'likes':
            if (uid === undefined) {
              throw new Error('uid is undefined');
            }
            history.push(`/users/${uid}/likes`);
            break;
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
            console.log(`name = ${name}`);
            break;
        }
      },
    })
  )(Component)
);
