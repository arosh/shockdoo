// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import createStore from './createStore';
import * as reducer from './reducer';
import './bootstrap';

const store = createStore();

window.addEventListener('DOMContentLoaded', async () => {
  const reactRoot = document.getElementById('react-root');
  if (reactRoot) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      reactRoot
    );
  }
});

store.dispatch(reducer.setOnSignIn());
store.dispatch(reducer.setOnSignOut());
