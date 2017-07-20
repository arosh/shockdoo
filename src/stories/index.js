import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Navigation from '../components/Navigation';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  // 日本語用にNotoフォントを入れておく
  // https://blog.rudolph-miller.com/2016/01/11/theme-of-material-ui/
  fontFamily: "'Roboto', 'Noto Sans JP', 'sans-serif'",
});

const MuiDecorator = story =>
  <MuiThemeProvider muiTheme={muiTheme}>
    {story()}
  </MuiThemeProvider>;

storiesOf('Welcome', module).add('to Storybook', () =>
  <Welcome showApp={linkTo('Button')} />
);

storiesOf('Button', module)
  .add('with text', () =>
    <Button onClick={action('clicked')}>Hello Button</Button>
  )
  .add('with some emoji', () =>
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  );

storiesOf('Navigation', module)
  .addDecorator(MuiDecorator)
  .add('default', () => <Navigation />);
