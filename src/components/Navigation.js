// @flow

import React from 'react';
import Paper from 'material-ui/Paper';
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import IconHome from 'material-ui/svg-icons/action/home';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import IconThumbUp from 'material-ui/svg-icons/action/thumb-up';
import IconAccountBox from 'material-ui/svg-icons/action/account-box';

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

type TProps = {
  fixedToBottom?: boolean,
  selectedIndex?: number,
  onTouchTap: string => void,
};

// Storybook用にfixedToBottomを可変にしておいたけど，実はfixedToBottomでもStorybookがよろしくやってくれることがわかった。
// ThumbnailsのzDepthが1なので2にする
export function Navigation(props: TProps) {
  const { fixedToBottom, selectedIndex, onTouchTap } = props;
  const style = fixedToBottom !== undefined ? styles.paper : {};
  return (
    <Paper zDepth={2} style={style}>
      <BottomNavigation selectedIndex={selectedIndex}>
        <BottomNavigationItem
          label="Home"
          icon={<IconHome />}
          onTouchTap={() => onTouchTap('home')}
        />
        <BottomNavigationItem
          label="Upload Photo"
          icon={<IconPhotoCamera />}
          onTouchTap={() => onTouchTap('upload')}
        />
        <BottomNavigationItem
          label="Like"
          icon={<IconThumbUp />}
          onTouchTap={() => onTouchTap('like')}
        />
        <BottomNavigationItem
          label="My Page"
          icon={<IconAccountBox />}
          onTouchTap={() => onTouchTap('profile')}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
