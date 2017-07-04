// @flow
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';

import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import IconAccountBox from 'material-ui/svg-icons/action/account-box';
import Paper from 'material-ui/Paper';

import React from 'react';

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
      <Paper zDepth={2} style={styles.paper}>
        <BottomNavigation>
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
