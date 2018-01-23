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
          onChange={() => this.handleInputChanged()}
        />
      </form>
      <FloatingActionButton
        onClick={() => this.refs.theUpload.click()}
        style={styles.floatingButton}
        secondary
      >
        <IconAddPhoto />
      </FloatingActionButton>
    </div>
  );

  handleInputChanged = () => {
    const fileForm = this.refs.theUpload;
    // https://qiita.com/minodisk/items/24e253bb9f2313621a6b
    const file: File = fileForm.files[0];
    if (!file) {
      return;
    }
    fileForm.form.reset();
    this.props.onFileSelect(file);
  };
}
