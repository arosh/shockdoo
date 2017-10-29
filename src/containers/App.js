// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AppBar from './AppBar';
import Drawer from './Drawer';
import AddPhotoButton from './AddPhotoButton';
import SubmitForm from './SubmitForm';
// import Navigation from './Navigation';
// import Thumbnails from './Thumbnails';

const styles = {
  appbarPadding: {
    paddingTop: 64,
  },
};

const Root = ({ match }) => (
  <div>
    root
    <pre>{JSON.stringify(match, null, 2)}</pre>
  </div>
);

const Submit = ({ match }) => (
  <div>
    submit
    <pre>{JSON.stringify(match, null, 2)}</pre>
    <SubmitForm />
  </div>
);

const Photos = ({ match }) => (
  <div>
    <Switch>
      <Route
        exact
        path={match.url}
        render={({ match }) => (
          <div>
            photos#index<pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route
        exact
        path={match.url + '/new'}
        render={({ match }) => (
          <div>
            photos#new<pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route
        exact
        path={match.url + '/:id'}
        render={({ match }) => (
          <div>
            photos#show ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route render={() => <div>Not Found</div>} />
    </Switch>
  </div>
);

const Users = ({ match }) => (
  <div>
    <Switch>
      <Route
        exact
        path={match.url + '/:id'}
        render={({ match }) => (
          <div>
            users#show ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route
        exact
        path={match.url + '/:id/edit'}
        render={({ match }) => (
          <div>
            users#edit ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route
        exact
        path={match.url + '/:id/photos'}
        render={({ match }) => (
          <div>
            users#photos ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route
        exact
        path={match.url + '/:id/likes'}
        render={({ match }) => (
          <div>
            users#likes ({match.params.id})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route render={() => <div>Not Found</div>} />
    </Switch>
  </div>
);

const Sitemap = () => (
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
      <Link to="/users/456/likes">users#likes_index</Link>
    </li>
  </ul>
);

export default () => (
  <Router>
    <div>
      <AppBar />
      <Drawer />
      <AddPhotoButton />
      <div className="container-fluid" style={styles.appbarPadding}>
        <Sitemap />
        <hr />
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/submit" component={Submit} />
          <Route path="/photos" component={Photos} />
          <Route path="/users" component={Users} />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </div>
    </div>
  </Router>
);
