// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import createStore from './createStore';
import { setOnSignIn, setOnSignOut } from './reducer';
import './bootstrap';

const store = createStore();

window.addEventListener('DOMContentLoaded', async () => {
  const reactRootEl = document.getElementById('react-root');
  if (reactRootEl) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      reactRootEl
    );
  }
});

store.dispatch(setOnSignIn());
store.dispatch(setOnSignOut());
