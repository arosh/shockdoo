// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';
import createStore from './createStore';
import * as action from './reducer';
import './bootstrap';

window.addEventListener('load', async function() {
  const store = createStore();
  store.dispatch(action.setOnSignIn());
  store.dispatch(action.setOnSignOut());

  const muiTheme = getMuiTheme({});
  const reactRootEl = document.getElementById('react-root');
  if (reactRootEl) {
    ReactDOM.render(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </Provider>,
      reactRootEl
    );
  }
});
