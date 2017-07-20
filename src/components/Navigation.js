// @flow

import React from 'react';
import Paper from 'material-ui/Paper';
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import IconHome from 'material-ui/svg-icons/action/home';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconAccountBox from 'material-ui/svg-icons/action/account-box';

// storybookで使うなら，クラスを使う側から指定する方がいいような気がする
const styles = {
  paper: {
    // 画面の下側に固定する
    left: 0,
    bottom: 0,
    position: 'fixed',
    width: '100vw',
    zIndex: 2, // そのままだと FlatButton が浮き上がってしまう
  },
};

export default class Navigation extends React.Component {
  render() {
    return (
      <Paper zDepth={2}>
        <BottomNavigation>
          <BottomNavigationItem label="Home" icon={<IconHome />} />
          <BottomNavigationItem
            label="Upload Photo"
            icon={<IconPhotoCamera />}
          />
          <BottomNavigationItem label="Favorites" icon={<IconFavorite />} />
          <BottomNavigationItem label="My Page" icon={<IconAccountBox />} />
        </BottomNavigation>
      </Paper>
    );
  }
}
