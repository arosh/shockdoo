// @flow
import React from 'react';
import * as classNames from 'classnames';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { orangeA700 } from 'material-ui/styles/colors';
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
        backgroundColor={orangeA700}
      >
        <IconAddPhoto />
      </FloatingActionButton>
    </div>
  );
}
