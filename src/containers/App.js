// @flow
import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { green400, orange600 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
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
        path={match.url + '/:photoID'}
        render={({ match }) => (
          <div>
            <Detail photoID={match.params.photoID} />
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
        path={match.url + '/:uid/photos'}
        render={({ match }) => (
          <div>
            users#photos ({match.params.uid})
            <pre>{JSON.stringify(match, null, 2)}</pre>
          </div>
        )}
      />
      <Route
        exact
        path={match.url + '/:uid/likes'}
        render={({ match }) => (
          <div>
            users#likes ({match.params.uid})
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

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange600,
    accent1Color: green400,
  },
});

const App = (props: AppProps) => (
  <MuiThemeProvider muiTheme={muiTheme}>
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
