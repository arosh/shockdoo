// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './containers/App';
import store from './flux/store';
import * as action from './flux/action';

import 'flexboxgrid/css/flexboxgrid.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'typeface-roboto';
import './index.css';

store.dispatch(action.setOnSignIn());
store.dispatch(action.setOnSignOut());

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('react-root')
);
