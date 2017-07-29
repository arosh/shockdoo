// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DrawerComponent from '../components/Drawer';
import { toggleDrawer, signIn, signOut } from '../flux/action';

export default withRouter(
  connect(
    state => ({
      logged: state.logged,
      open: state.drawerOpened,
      userId: state.userId,
    }),
    (dispatch, ownProps) => ({
      onRequestChange: open => dispatch(toggleDrawer(open)),
      onTouchTap: (name: string, userId?: number) => {
        const { history } = ownProps;
        dispatch(toggleDrawer(false));
        switch (name) {
          case 'home':
            history.push('/');
            break;
          case 'profile':
            if (userId === undefined) {
              throw new Error('userId is undefined');
            }
            history.push(`/users/${userId}`);
            break;
          case 'photos':
            if (userId === undefined) {
              throw new Error('userId is undefined');
            }
            history.push(`/users/${userId}/photos`);
            break;
          case 'like':
            if (userId === undefined) {
              throw new Error('userId is undefined');
            }
            history.push(`/users/${userId}/like`);
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
            console.log(name);
            break;
        }
      },
    })
  )(DrawerComponent)
);
