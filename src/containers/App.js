// @flow
import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AddPhotoButton from './AddPhotoButton';
import AppBar from './AppBar';
import Detail from './Detail';
import Drawer from './Drawer';
import Loading from '../components/Loading';
import NameDialog from './NameDialog';
import Notification from './Notification';
import SubmitForm from './SubmitForm';
import ThumbCollection from './ThumbCollection';
import type { State } from '../reducer';

const styles = {
  container: {
    marginTop: 'calc(64px + 1em)',
  },
  containerSmall: {
    marginTop: 'calc(64px + 1em)',
    paddingLeft: '1rem',
    paddingRight: '1rem',
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
        path={match.url + '/:seq'}
        render={({ match }) => (
          <div>
            <Detail seq={match.params.seq} />
            <hr />
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
    </Switch>
  </div>
);

const Users = ({ match }) => (
  <div>
    <Switch>
      <Route
        exact
        path={match.url + '/:seq/photos'}
        render={({ match }) => (
          <div>
            users#photos ({match.params.seq})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route
        exact
        path={match.url + '/:seq/likes'}
        render={({ match }) => (
          <div>
            users#likes ({match.params.seq})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
    </Switch>
  </div>
);

const Sitemap = () => (
  <ul>
    <li>
      <Link to="/">root</Link>
    </li>
    <li>
      <Link to="/photos/new">photos#new</Link>
    </li>
    <li>
      <Link to="/photos/123">photos#show</Link>
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
  <MuiThemeProvider>
    <Router>
      <div>
        {props.loading && <Loading />}
        <Media query={{ minWidth: 768 }}>
          {matches => (
            <div
              className={classNames('container-fluid', {
                hidden: props.loading,
              })}
              style={matches ? styles.container : styles.containerSmall}
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
          )}
        </Media>
        <AppBar />
        <Drawer />
        <AddPhotoButton />
        <Notification />
        <NameDialog />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default connect((state: State) => ({
  loading: state.loading,
}))(App);
