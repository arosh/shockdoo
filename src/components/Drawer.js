// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

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
  onClick: (name: string) => void,
  uid: number,
};

const Drawer = ({ open, onRequestChange, logged, onClick, uid }: PropTypes) => (
  <MaterialDrawer
    open={open}
    docked={false}
    onRequestChange={op => onRequestChange(op)}
  >
    <MenuItem
      leftIcon={<IconHome />}
      containerElement={<Link to="/" />}
      primaryText="ホーム"
      onClick={() => onRequestChange(false)}
    />
    {logged ? (
      <React.Fragment>
        <MenuItem
          leftIcon={<IconPhotoCamera />}
          containerElement={<Link to={`/users/${uid}/photos`} />}
          primaryText="写真"
          onClick={() => onRequestChange(false)}
        />
        <MenuItem
          leftIcon={<IconThumbUp />}
          containerElement={<Link to={`/users/${uid}/likes`} />}
          primaryText="お気に入り"
          onClick={() => onRequestChange(false)}
        />
        <Divider />
        <MenuItem
          leftIcon={<IconSignOut />}
          primaryText="ログアウト"
          onClick={() => onClick('signout')}
        />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Divider />
        <MenuItem
          leftIcon={<IconTwitter />}
          primaryText="Twitterでログイン"
          onClick={() => onClick('signin-twitter')}
        />
        <MenuItem
          leftIcon={<IconGoogle />}
          primaryText="Googleでログイン"
          onClick={() => onClick('signin-google')}
        />
      </React.Fragment>
    )}
  </MaterialDrawer>
);

export default Drawer;
