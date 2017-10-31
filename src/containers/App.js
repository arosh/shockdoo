// @flow
import React from 'react';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AppBar from './AppBar';
import Drawer from './Drawer';
import AddPhotoButton from './AddPhotoButton';
import SubmitForm from './SubmitForm';
import NameDialog from './NameDialog';
import ThumbCollection from './ThumbCollection';
import Loading from '../components/Loading';
import type { State } from '../reducer';

const styles = {
  container: {
    marginTop: 'calc(64px + 1em)',
  },
};

const Root = ({ match }) => (
  <div>
    <ThumbCollection />
    <hr />
    <pre>{JSON.stringify(match, null, 2)}</pre>
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
            <SubmitForm />
            <hr />
            <pre>{JSON.stringify(match, null, 2)}</pre>
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

type AppProps = {
  loading: boolean,
};

const App = (props: AppProps) => (
  <Router>
    <div>
      {props.loading && <Loading />}
      <div
        className={classNames('container-fluid', { hidden: props.loading })}
        style={styles.container}
      >
        <Switch>
          <Route exact path="/" component={Root} />
          <Route path="/photos" component={Photos} />
          <Route path="/users" component={Users} />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
        <hr />
        <Sitemap />
      </div>
      <AppBar />
      <Drawer />
      <AddPhotoButton />
      <NameDialog />
    </div>
  </Router>
);

export default connect((state: State) => ({
  loading: state.loading,
}))(App);
