// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';
import store from './flux/store';
import * as action from './flux/action';
import './bootstrap';

store.dispatch(action.setOnSignIn());
store.dispatch(action.setOnSignOut());

const muiTheme = getMuiTheme({});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-root')
);
