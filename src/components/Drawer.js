// @flow
import React from 'react';

import Divider from 'material-ui/Divider';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import {
  IconHome,
  IconAccountCircle,
  IconThumbUp,
  IconSignOut,
  IconGoogle,
  IconTwitter,
} from './icon';

type PropTypes = {
  open: boolean,
  onRequestChange: boolean => void,
  logged: boolean,
  onTouchTap: string => void,
};

export function Drawer(props: PropTypes) {
  const { open, onRequestChange, logged, onTouchTap } = props;
  return (
    <MaterialDrawer
      open={open}
      docked={false}
      onRequestChange={op => onRequestChange(op)}
    >
      <MenuItem leftIcon={<IconHome />} onTouchTap={() => onTouchTap('home')}>
        Home
      </MenuItem>
      {logged
        ? <div>
            <MenuItem
              leftIcon={<IconAccountCircle />}
              onTouchTap={() => onTouchTap('logout')}
            >
              Profile
            </MenuItem>
            <MenuItem
              leftIcon={<IconThumbUp />}
              onTouchTap={() => onTouchTap('logout')}
            >
              Like
            </MenuItem>
            <Divider />
            <MenuItem
              leftIcon={<IconSignOut />}
              onTouchTap={() => onTouchTap('logout')}
            >
              Sign out
            </MenuItem>
          </div>
        : <div>
            <Divider />
            <MenuItem
              leftIcon={<IconTwitter />}
              onTouchTap={() => onTouchTap('login-twitter')}
            >
              Sign in with Twitter
            </MenuItem>
            <MenuItem
              leftIcon={<IconGoogle />}
              onTouchTap={() => onTouchTap('login-google')}
            >
              Sign in with Google
            </MenuItem>
          </div>}
    </MaterialDrawer>
  );
}
