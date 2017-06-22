// @flow
import React from 'react';
import IconStar from 'material-ui/svg-icons/toggle/star';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import RaisedButton from 'material-ui/RaisedButton';

import SubmitForm from './SubmitForm';
import Eval from './Eval';
import Navigation from './Navigation';

const styles = {
  button: {
    margin: 12,
  },
  input: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default () =>
  <div>
    <RaisedButton
      label="画像を選択してください"
      icon={<IconPhotoCamera />}
      containerElement="label"
      style={styles.button}
      fullWidth={true}
    >
      <input type="file" style={styles.input} />
    </RaisedButton>
    <br />
    <RaisedButton icon={<IconStar />} label="1" style={styles.button} />
    <RaisedButton icon={<IconStar />} label="2" style={styles.button} />
    <RaisedButton icon={<IconStar />} label="3" style={styles.button} />
    <RaisedButton icon={<IconStar />} label="4" style={styles.button} />
    <Navigation />
  </div>;
