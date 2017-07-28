// @flow
import { connect } from 'react-redux';
import DrawerComponent from '../components/Drawer';
import { toggleDrawer, signIn, signOut } from '../flux/action';

export default connect(
  state => ({
    logged: state.logged,
    open: state.drawerOpened,
  }),
  dispatch => ({
    onRequestChange: open => dispatch(toggleDrawer(open)),
    onTouchTap: (tag: string) => {
      switch (tag) {
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
          console.log(tag);
          break;
      }
    },
  })
)(DrawerComponent);
