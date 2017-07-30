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
} from '../icons';

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
        ホーム
      </MenuItem>
      {logged
        ? <div>
            <MenuItem
              leftIcon={<IconAccountCircle />}
              onTouchTap={() => onTouchTap('profile', userId)}
            >
              マイページ
            </MenuItem>
            <MenuItem
              leftIcon={<IconPhotoCamera />}
              onTouchTap={() => onTouchTap('photos', userId)}
            >
              写真
            </MenuItem>
            <MenuItem
              leftIcon={<IconThumbUp />}
              onTouchTap={() => onTouchTap('like', userId)}
            >
              お気に入り
            </MenuItem>
            <Divider />
            <MenuItem
              leftIcon={<IconSignOut />}
              onTouchTap={() => onTouchTap('signout', userId)}
            >
              ログアウト
            </MenuItem>
          </div>
        : <div>
            <Divider />
            <MenuItem
              leftIcon={<IconTwitter />}
              onTouchTap={() => onTouchTap('signin-twitter')}
            >
              Twitterでログイン
            </MenuItem>
            <MenuItem
              leftIcon={<IconGoogle />}
              onTouchTap={() => onTouchTap('signin-google')}
            >
              Googleでログイン
            </MenuItem>
          </div>}
    </MaterialDrawer>
  );
}
