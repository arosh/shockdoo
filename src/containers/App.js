// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppBar from './AppBar';
import Drawer from './Drawer';
// import AddPhotoButton from '../components/AddPhotoButton';
// import Navigation from './Navigation';
// import Upload from './Upload';
// import Thumbnails from './Thumbnails';

// <div className="container-fluid" />
{
  /* <Router>
</Router> */
}

export default () =>
  <div>
    <AppBar />
    <Drawer />
  </div>;
