// @flow
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { IconAddPhoto } from './icons';

const styles = {
  floatingButton: {
    right: 20,
    bottom: 20,
    position: 'fixed',
  },
  displayNone: {
    display: 'none',
  },
};

type PropTypes = {
  onFileSelect: any => void,
};

export default class AddPhotoButton extends React.Component<PropTypes, {}> {
  render = () => (
    <div>
      <input
        type="file"
        ref="theUpload"
        accept="image/*,.png,.jpg,.jpeg,.gif"
        style={styles.displayNone}
        onChange={() => this.props.onFileSelect(this.refs.theUpload)}
      />
      <FloatingActionButton
        onTouchTap={() => this.refs.theUpload.click()}
        style={styles.floatingButton}
        secondary
      >
        <IconAddPhoto />
      </FloatingActionButton>
    </div>
  );
}
