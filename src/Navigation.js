import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconToday from 'material-ui/svg-icons/action/today';

const styles = {
  fixedToBottom: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
};

export default class Navigation extends React.Component {
  render() {
    return (
      <Paper zDepth={2} style={styles.fixedToBottom}>
        <BottomNavigation>
          <BottomNavigationItem
            label="Upload Photo"
            icon={<IconPhotoCamera />}
          />
          <BottomNavigationItem label="Favorites" icon={<IconFavorite />} />
          <BottomNavigationItem label="Today" icon={<IconToday />} />
        </BottomNavigation>
      </Paper>
    );
  }
}
