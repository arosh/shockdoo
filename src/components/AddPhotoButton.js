// @flow
import React from 'react';
import * as classNames from 'classnames';
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
  display: boolean,
  onFileSelect: any => void,
};

export default class AddPhotoButton extends React.Component<PropTypes, {}> {
  render = () => (
    <div className={classNames({ hidden: !this.props.display })}>
      <form>
        <input
          type="file"
          ref="theUpload"
          accept="image/*"
          style={styles.displayNone}
          onChange={() => this.props.onFileSelect(this.refs.theUpload)}
        />
      </form>
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
