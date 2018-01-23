// @flow
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { IconNavigationMore } from './icons';

type PropTypes = {
  onClick: () => void,
};

export default class MoreButton extends React.Component<PropTypes, {}> {
  render = () => (
    <div style={{ marginBottom: '1em', textAlign: 'center' }}>
      <FloatingActionButton onClick={() => this.props.onClick()}>
        <IconNavigationMore />
      </FloatingActionButton>
    </div>
  );
}
