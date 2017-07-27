// @flow
import React from 'react';

import Divider from 'material-ui/Divider';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconHome from 'material-ui/svg-icons/action/home';

type PropTypes = {
  open: boolean,
  onRequestChange: boolean => void,
  logged: boolean,
  onTouchTap: string => void,
};

export function Drawer(props: PropTypes) {
  const { open, onRequestChange, logged, onTouchTap } = this.props;
  return (
    <MaterialDrawer
      open={open}
      docked={false}
      onRequestChange={op => onRequestChange(op)}
    >
      <MenuItem leftIcon={<IconHome />} onTouchTap={() => onTouchTap('home')}>
        Home
      </MenuItem>
      <Divider />
      {logged
        ? <div>
            <MenuItem
              primaryText="ログアウト"
              onTouchTap={() => onTouchTap('logout')}
            />
          </div>
        : <div>
            <MenuItem
              primaryText="Googleでログイン"
              onTouchTap={() => onTouchTap('login-google')}
            />
            <MenuItem
              primaryText="Twitterでログイン"
              onTouchTap={() => onTouchTap('login-twitter')}
            />
          </div>}
    </MaterialDrawer>
  );
}
