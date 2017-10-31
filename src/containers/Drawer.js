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
      userID: state.userID,
    }),
    (dispatch, ownProps) => ({
      onRequestChange: open => dispatch(toggleDrawer(open)),
      onTouchTap: (name: string, userID?: number) => {
        const { history } = ownProps;
        dispatch(toggleDrawer(false));
        switch (name) {
          case 'home':
            history.push('/');
            break;
          case 'profile':
            if (userID === undefined) {
              throw new Error('userId is undefined');
            }
            history.push(`/users/${userID}`);
            break;
          case 'photos':
            if (userID === undefined) {
              throw new Error('userId is undefined');
            }
            history.push(`/users/${userID}/photos`);
            break;
          case 'likes':
            if (userID === undefined) {
              throw new Error('userId is undefined');
            }
            history.push(`/users/${userID}/likes`);
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
