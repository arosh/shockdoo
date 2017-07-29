// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppBar from './AppBar';
import Drawer from './Drawer';
// import AddPhotoButton from '../components/AddPhotoButton';
// import Navigation from './Navigation';
// import Upload from './Upload';
// import Thumbnails from './Thumbnails';

const Root = ({match}) =>
  <div>Root</div>

const Photos = ({match}) =>
  <div>Photos</div>

const Users = ({match}) =>
  <div>Users</div>

export default () =>
  <Router>
    <div>
      <AppBar />
      <Drawer />
      <div className="container-fluid">
        <ul>
          <li><Link to="/">root</Link></li>
          <li><Link to="/photos">photos#index</Link></li>
          <li><Link to="/photos/new">photos#new</Link></li>
          <li><Link to="/photos/123">photos#show</Link></li>
          <li><Link to="/photos/123/edit">photos#edit</Link></li>
          <li><Link to="/users/123">users#show</Link></li>
          <li><Link to="/users/123/edit">users#edit</Link></li>
          <li><Link to="/users/123/photos">users#photos_index</Link></li>
          <li><Link to="/users/123/likes">users#likes_index</Link></li>
        </ul>
        <hr />
        <Route exact path="/" component={Root} />
        <Route path="/photos" component={Photos} />
        <Route path="/users" component={Users} />
      </div>
    </div>
  </Router>
