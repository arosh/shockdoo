// @flow
import React from 'react';

import Divider from 'material-ui/Divider';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import {
  IconHome,
  IconAccountCircle,
  IconPhotoCamera,
  IconThumbUp,
  IconSignOut,
  IconGoogle,
  IconTwitter,
} from './icon';

type PropTypes = {
  open: boolean,
  onRequestChange: boolean => void,
  logged: boolean,
  onTouchTap: (name: string, userId?: number) => void,
  userId: number,
};

export default function Drawer(props: PropTypes) {
  const { open, onRequestChange, logged, onTouchTap, userId } = props;
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
              onTouchTap={() => onTouchTap('profile', userId)}
            >
              Profile
            </MenuItem>
            <MenuItem
              leftIcon={<IconPhotoCamera />}
              onTouchTap={() => onTouchTap('photos', userId)}
            >
              Photos
            </MenuItem>
            <MenuItem
              leftIcon={<IconThumbUp />}
              onTouchTap={() => onTouchTap('like', userId)}
            >
              Like
            </MenuItem>
            <Divider />
            <MenuItem
              leftIcon={<IconSignOut />}
              onTouchTap={() => onTouchTap('signout', userId)}
            >
              Sign out
            </MenuItem>
          </div>
        : <div>
            <Divider />
            <MenuItem
              leftIcon={<IconTwitter />}
              onTouchTap={() => onTouchTap('signin-twitter')}
            >
              Sign in with Twitter
            </MenuItem>
            <MenuItem
              leftIcon={<IconGoogle />}
              onTouchTap={() => onTouchTap('signin-google')}
            >
              Sign in with Google
            </MenuItem>
          </div>}
    </MaterialDrawer>
  );
}
