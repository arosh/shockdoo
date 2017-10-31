// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';
import createStore from './createStore';
import { setOnSignIn, setOnSignOut } from './reducer';
import './bootstrap';

const store = createStore();
const muiTheme = getMuiTheme({});

window.addEventListener('DOMContentLoaded', async () => {
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

store.dispatch(setOnSignIn());
store.dispatch(setOnSignOut());
