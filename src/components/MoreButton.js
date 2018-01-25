// @flow
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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

export default class MoreButton extends React.Component<PropTypes, {}> {
  render = () => (
    <div style={styles.moreButton}>
      <FloatingActionButton onClick={() => this.props.onClick()}>
        <IconNavigationMore />
      </FloatingActionButton>
    </div>
  );
}
