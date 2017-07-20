import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Navigation } from '../components/Navigation';
import { ThumbnailCollection } from '../components/ThumbnailCollection';

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

storiesOf('Navigation', module)
  .addDecorator(MuiDecorator)
  .add('default', () =>
    <Navigation selectedIndex={1} onTouchTap={action('tap')} />
  )
  .add('fixedToBottom', () =>
    <Navigation
      fixedToBottom={true}
      selectedIndex={1}
      onTouchTap={action('tap')}
    />
  );

const imageUrls = [
  'images/foods/IMG_20170311_113428.jpg',
  'images/foods/IMG_20170425_190325.jpg',
  'images/foods/IMG_20170517_183600.jpg',
  'images/foods/IMG_20170607_183134.jpg',
  'images/foods/IMG_20170614_181803.jpg',
  'images/foods/IMG_20170628_175750.jpg',
];

const thumbnails = imageUrls.map(url => ({
  imageUrl: url,
  userId: 'shora_kujira16',
  uploadedAt: '2017/07/20',
}));

storiesOf('Thumbnails', module)
  .addDecorator(MuiDecorator)
  .add('default', () => <ThumbnailCollection thumbnails={thumbnails} />);
