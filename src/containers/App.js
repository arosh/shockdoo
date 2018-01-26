// @flow
import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import * as classNames from 'classnames';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { green400, orange500 } from 'material-ui/styles/colors';
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

const Root = ({ match }) => <ThumbCollection type="root" />;

const Photos = ({ match }) => (
  <div>
    <Switch>
      <Route
        exact
        path={match.url + '/new'}
        render={({ match }) => <SubmitForm />}
      />
      <Route
        exact
        path={match.url + '/:photoID'}
        render={({ match }) => <Detail photoID={match.params.photoID} />}
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
          <ThumbCollection type="users/photos" uid={match.params.uid} />
        )}
      />
      <Route
        exact
        path={match.url + '/:uid/likes'}
        render={({ match }) => (
          <ThumbCollection type="users/likes" uid={match.params.uid} />
        )}
      />
    </Switch>
  </div>
);

type AppProps = {
  loading: boolean,
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange500,
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
