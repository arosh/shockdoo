// @flow
import { connect } from 'react-redux';
import AppBarComponent from '../components/AppBar';
import { signIn, signOut, toggleDrawer } from '../reducer';

export default connect(
  state => ({
    logged: state.logged,
  }),
  dispatch => ({
    onLeftIconButtonTouchTap: () => dispatch(toggleDrawer(true)),
    onSignIn: (providerName: string) => dispatch(signIn(providerName)),
    onSignOut: () => dispatch(signOut()),
  })
)(AppBarComponent);
