// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AppBar from './AppBar';
import Drawer from './Drawer';
// import AddPhotoButton from '../components/AddPhotoButton';
// import Navigation from './Navigation';
// import Upload from './Upload';
// import Thumbnails from './Thumbnails';

const styles = {
  appbarPadding: {
    paddingTop: 64,
  },
};

const Root = ({ match }) =>
  <div>
    root
    <pre>{JSON.stringify(match, null, 2)}</pre>
  </div>;

const Photos = ({ match }) =>
  <div>
    <Switch>
      <Route
        exact
        path={match.url}
        render={({ match }) =>
          <div>
            photos#index<pre>{JSON.stringify(match, null, 2)}</pre>
          </div>}
      />
      <Route
        exact
        path={match.url + '/new'}
        render={({ match }) =>
          <div>
            photos#new<pre>{JSON.stringify(match, null, 2)}</pre>
          </div>}
      />
      <Route
        exact
        path={match.url + '/:id'}
        render={({ match }) =>
          <div>
            photos#show ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>}
      />
      <Route render={() => <div>Not Found</div>} />
    </Switch>
  </div>;

const Users = ({ match }) =>
  <div>
    <Switch>
      <Route
        exact
        path={match.url + '/:id'}
        render={({ match }) =>
          <div>
            users#show ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>}
      />
      <Route
        exact
        path={match.url + '/:id/edit'}
        render={({ match }) =>
          <div>
            users#edit ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>}
      />
      <Route
        exact
        path={match.url + '/:id/photos'}
        render={({ match }) =>
          <div>
            users#photos ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>}
      />
      <Route
        exact
        path={match.url + '/:id/like'}
        render={({ match }) =>
          <div>
            users#like ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>}
      />
      <Route render={() => <div>Not Found</div>} />
    </Switch>
  </div>;

const Sitemap = () =>
  <ul>
    <li>
      <Link to="/">root</Link>
    </li>
    <li>
      <Link to="/photos">photos#index</Link>
    </li>
    <li>
      <Link to="/photos/new">photos#new</Link>
    </li>
    <li>
      <Link to="/photos/123">photos#show</Link>
    </li>
    <li>
      <Link to="/users/456">users#show</Link>
    </li>
    <li>
      <Link to="/users/456/edit">users#edit</Link>
    </li>
    <li>
      <Link to="/users/456/photos">users#photos_index</Link>
    </li>
    <li>
      <Link to="/users/456/like">users#like_index</Link>
    </li>
  </ul>;

export default () =>
  <Router>
    <div>
      <AppBar />
      <Drawer />
      <div className="container-fluid" style={styles.appbarPadding}>
        <Sitemap />
        <hr />
        <Switch>
          <Route exact path="/" component={Root} />
          <Route path="/photos" component={Photos} />
          <Route path="/users" component={Users} />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </div>
    </div>
  </Router>;
