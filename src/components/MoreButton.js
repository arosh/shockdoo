// @flow
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { IconNavigationMore } from './icons';
import { orange400 } from 'material-ui/styles/colors';

const styles = {
  moreButton: {
    marginBottom: '1em',
    textAlign: 'center',
  },
};

type PropTypes = {
  onClick: () => void,
};

export default class MoreButton extends React.Component<PropTypes, {}> {
  render = () => (
    <div style={styles.moreButton}>
      <FloatingActionButton
        onClick={() => this.props.onClick()}
        backgroundColor={orange400}
      >
        <IconNavigationMore />
      </FloatingActionButton>
    </div>
  );
}
