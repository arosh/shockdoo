// @flow
import React from 'react';

import MaterialAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { IconSignIn, IconSignOut, IconGoogle, IconTwitter } from './icons';

const styles = {
  appbar: {
    left: 0,
    top: 0,
    position: 'fixed',
  },
  title: {
    cursor: 'pointer',
  },
};

type SignInProps = {
  onSignIn: (providerName: string) => void,
};

type SignInState = {
  open: boolean,
  anchorEl: ?any,
};

class SignIn extends React.Component<SignInProps, SignInState> {
  // https://github.com/callemall/material-ui/issues/5053
  static muiName = 'FlatButton';

  constructor(props: SignInProps) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  openPopover = event => {
    // prevent ghost click
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  closePopover = () => {
    this.setState({
      open: false,
    });
  };

  signIn = (providerName: string) => {
    this.closePopover();
    this.props.onSignIn(providerName);
  };

  render() {
    const { onSignIn, ...otherProps } = this.props;
    // AppBar向けのスタイルを適用するためにFlatButtonにpropsを渡す必要がある
    return (
      <div>
        <FlatButton
          {...otherProps}
          label="ログイン"
          onTouchTap={e => this.openPopover(e)}
          icon={<IconSignIn />}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          onRequestClose={() => this.closePopover()}
        >
          <Menu>
            <MenuItem
              primaryText="Twitterでログイン"
              onTouchTap={() => this.signIn('twitter')}
              leftIcon={<IconTwitter />}
            />
            <MenuItem
              primaryText="Googleでログイン"
              onTouchTap={() => this.signIn('google')}
              leftIcon={<IconGoogle />}
            />
          </Menu>
        </Popover>
      </div>
    );
  }
}

type SignOutPropTypes = {
  onSignOut: () => void,
};

function SignOut(props: SignOutPropTypes) {
  const { onSignOut, ...otherProps } = props;
  // AppBar向けのスタイルを適用するためにpropsを渡す必要がある
  return (
    <FlatButton
      {...otherProps}
      label="ログアウト"
      onTouchTap={onSignOut}
      icon={<IconSignOut />}
    />
  );
}

// https://github.com/callemall/material-ui/issues/5053
SignOut.muiName = 'FlatButton';

type PropTypes = {
  logged: boolean,
  onTitleTouchTap: () => void,
  onLeftIconButtonTouchTap: () => void,
  onSignIn: (providerName: string) => void,
  onSignOut: () => void,
};

export default function AppBar(props: PropTypes) {
  const {
    logged,
    onTitleTouchTap,
    onLeftIconButtonTouchTap,
    onSignIn,
    onSignOut,
  } = props;
  return (
    <MaterialAppBar
      title={<span style={styles.title}>Shockdoo</span>}
      onTitleTouchTap={() => onTitleTouchTap()}
      onLeftIconButtonTouchTap={() => onLeftIconButtonTouchTap()}
      iconElementRight={
        logged ? (
          <SignOut onSignOut={onSignOut} />
        ) : (
          <SignIn onSignIn={onSignIn} />
        )
      }
      style={styles.appbar}
    />
  );
}
