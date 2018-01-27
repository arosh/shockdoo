// @flow
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { orange400 } from 'material-ui/styles/colors';
import { IconNavigationMore } from './icons';

const styles = {
  moreButton: {
    marginBottom: '1em',
    textAlign: 'center',
  },
};

type PropTypes = {
  onClick: () => void,
};

const MoreButton = ({ onClick }: PropTypes) => (
  <div style={styles.moreButton}>
    <FloatingActionButton onClick={() => onClick()} backgroundColor={orange400}>
      <IconNavigationMore />
    </FloatingActionButton>
  </div>
);

export default MoreButton;
