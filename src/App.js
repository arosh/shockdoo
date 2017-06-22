// @flow
import React from 'react';
import IconStar from 'material-ui/svg-icons/toggle/star';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';
import IconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import RaisedButton from 'material-ui/RaisedButton';

import SubmitForm from './SubmitForm';
import Eval from './Eval';
import Navigation from './Navigation';
import Upload from './Upload'

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
    <Upload />
    <Navigation />
  </div>;
