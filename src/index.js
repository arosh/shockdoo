// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';
import './index.css';
import 'flexboxgrid/css/flexboxgrid.min.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  // 日本語用にNotoフォントを入れておく
  // https://blog.rudolph-miller.com/2016/01/11/theme-of-material-ui/
  fontFamily: "'Roboto', 'Noto Sans JP', 'sans-serif'",
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('react-root')
);
