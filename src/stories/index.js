// @flow
import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Navigation } from '../components/Navigation';
import { ThumbnailCollection } from '../components/ThumbnailCollection';
import { Upload } from '../components/Upload';

import 'flexboxgrid/css/flexboxgrid.min.css';
import '../index.css';

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
    <div className="container-fluid">
      {story()}
    </div>
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

const thumbnails = imageUrls.map((url, index) => ({
  imageUrl: url,
  userId: '@shora_kujira16',
  uploadedAt: '2017/07/20',
  starCount: index % 5 + 1,
  favoriteCount: (index * 3 + 1) % 5,
  favoriteMark: index % 2 === 0,
}));

storiesOf('Thumbnails', module)
  .addDecorator(MuiDecorator)
  .add('default', () => <ThumbnailCollection thumbnails={thumbnails} />);

storiesOf('Upload', module)
  .addDecorator(MuiDecorator)
  .add('default', () =>
    <Upload imageUrl={imageUrls[0]} onSubmit={action('upload')} />
  );
