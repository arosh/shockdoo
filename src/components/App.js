// @flow
import Navigation from './Navigation';
import Upload from './Upload';
import Thumbnails from './Thumbnails';

import React from 'react';

export default () =>
  <div>
    <div className="container-fluid">
      <Thumbnails />
      <Upload />
    </div>
    <Navigation />
  </div>;
