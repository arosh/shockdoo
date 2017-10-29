// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppBarComponent from '../components/AppBar';
import { signIn, signOut, toggleDrawer } from '../reducer';

export default withRouter(
  connect(
    state => ({
      logged: state.logged,
    }),
    (dispatch, ownProps) => ({
      onTitleTouchTap: () => {
        const { history } = ownProps;
        history.push('/');
      },
      onLeftIconButtonTouchTap: () => dispatch(toggleDrawer(true)),
      onSignIn: (providerName: string) => dispatch(signIn(providerName)),
      onSignOut: () => dispatch(signOut()),
    })
  )(AppBarComponent)
);
