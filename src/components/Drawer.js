// @flow
import React from 'react';

import Divider from 'material-ui/Divider';
import MaterialDrawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import {
  IconHome,
  IconPhotoCamera,
  IconThumbUp,
  IconSignOut,
  IconGoogle,
  IconTwitter,
} from './icons';

type PropTypes = {
  open: boolean,
  onRequestChange: boolean => void,
  logged: boolean,
  onClick: (name: string, userId?: number) => void,
  userID: number,
};

export default function Drawer(props: PropTypes) {
  const { open, onRequestChange, logged, onClick, userID } = props;
  return (
    <MaterialDrawer
      open={open}
      docked={false}
      onRequestChange={op => onRequestChange(op)}
    >
      <MenuItem leftIcon={<IconHome />} onClick={() => onClick('home')}>
        ホーム
      </MenuItem>
      {logged ? (
        <div>
          <MenuItem
            leftIcon={<IconPhotoCamera />}
            onClick={() => onClick('photos', userID)}
          >
            写真
          </MenuItem>
          <MenuItem
            leftIcon={<IconThumbUp />}
            onClick={() => onClick('likes', userID)}
          >
            お気に入り
          </MenuItem>
          <Divider />
          <MenuItem
            leftIcon={<IconSignOut />}
            onClick={() => onClick('signout', userID)}
          >
            ログアウト
          </MenuItem>
        </div>
      ) : (
        <div>
          <Divider />
          <MenuItem
            leftIcon={<IconTwitter />}
            onClick={() => onClick('signin-twitter')}
          >
            Twitterでログイン
          </MenuItem>
          <MenuItem
            leftIcon={<IconGoogle />}
            onClick={() => onClick('signin-google')}
          >
            Googleでログイン
          </MenuItem>
        </div>
      )}
    </MaterialDrawer>
  );
}
