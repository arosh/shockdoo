// @flow
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconAddPhoto from 'material-ui/svg-icons/image/add-a-photo';

const styles = {
  floatingButton: {
    right: 10,
    bottom: 10,
    position: 'fixed',
  },
};

type PropTypes = {
  onTouchTap: () => void,
};

export function AddPhotoButton(props: PropTypes) {
  const { onTouchTap } = props;
  return (
    <FloatingActionButton onTouchTap={onTouchTap} style={styles.floatingButton}>
      <IconAddPhoto />
    </FloatingActionButton>
  );
}
