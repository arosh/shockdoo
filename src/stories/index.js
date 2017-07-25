// @flow
import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Navigation } from '../components/Navigation';
import { ThumbnailCollection } from '../components/ThumbnailCollection';
import { Upload } from '../components/Upload';
import { Detail } from '../components/Detail';
import { AppBar } from '../components/AppBar';

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
  'images/thumb/IMG_20170311_113428.jpg',
  'images/thumb/IMG_20170425_190325.jpg',
  'images/thumb/IMG_20170517_183600.jpg',
  'images/thumb/IMG_20170607_183134.jpg',
  'images/thumb/IMG_20170614_181803.jpg',
  'images/thumb/IMG_20170628_175750.jpg',
];

const thumbnails = imageUrls.map((url, index) => ({
  imageUrl: url,
  userName: '@shora_kujira16',
  uploadedAt: '2017/07/20',
  starCount: index % 5 + 1,
  favoriteCount: (index * 3 + 1) % 5,
  favoriteMark: index % 2 === 0,
  handleFavoriteClick: () => action('like')(index),
}));

storiesOf('Thumbnails', module)
  .addDecorator(MuiDecorator)
  .add('default', () => <ThumbnailCollection thumbnails={thumbnails} />);

storiesOf('Upload', module)
  .addDecorator(MuiDecorator)
  .add('default', () =>
    <Upload
      imageUrl={imageUrls[0]}
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      onSubmit={action('upload')}
    />
  );

storiesOf('Detail', module)
  .addDecorator(MuiDecorator)
  .add('default', () =>
    <Detail
      imageUrl={imageUrls[1]}
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={4}
      favoriteCount={3}
      favoriteMark={true}
      favoriteUsers={['@aoba_suzukaze', '@hifumi_takimoto', '@yun_iijima']}
      handleFavoriteClick={action('like')}
    />
  )
  .add('not popular', () =>
    <Detail
      imageUrl={imageUrls[2]}
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={2}
      favoriteCount={0}
      favoriteMark={false}
      favoriteUsers={[]}
      handleFavoriteClick={action('like')}
    />
  );

storiesOf('AppBar', module)
  .addDecorator(MuiDecorator)
  .add('not logged', () =>
    <AppBar
      logged={false}
      onLeftIconButtonTouchTap={action('left-icon')}
      onSignIn={linkTo('AppBar', 'logged')}
      onSignOut={linkTo('AppBar', 'not logged')}
    />
  )
  .add('logged', () =>
    <AppBar
      logged={true}
      onLeftIconButtonTouchTap={action('left-icon')}
      onSignIn={linkTo('AppBar', 'logged')}
      onSignOut={linkTo('AppBar', 'not logged')}
    />
  );
