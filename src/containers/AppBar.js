// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Component from '../components/AppBar';
import { signIn, signOut, toggleDrawer } from '../reducer';

export default withRouter(
  connect(
    state => ({
      logged: state.logged,
    }),
    (dispatch, ownProps) => ({
      onTitleClick: () => {
        const { history } = ownProps;
        history.push('/');
      },
      onLeftIconButtonClick: () => dispatch(toggleDrawer(true)),
      onSignIn: (providerName: string) => dispatch(signIn(providerName)),
      onSignOut: () => dispatch(signOut()),
    })
  )(Component)
);
