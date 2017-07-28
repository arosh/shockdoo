// @flow
import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { ThumbnailCollection } from '../components/ThumbnailCollection';
import { Upload } from '../components/Upload';
import { Detail } from '../components/Detail';
import { AppBar } from '../components/AppBar';
import { AddPhotoButton } from '../components/AddPhotoButton';
import { Drawer } from '../components/Drawer';

import 'flexboxgrid/css/flexboxgrid.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'typeface-roboto';
import 'typeface-noto-sans'
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

const imageUrls = [
  'images/samples/horizontal-large.jpg',
  'images/samples/horizontal-small.jpg',
  'images/samples/vertical-large.jpg',
  'images/samples/vertical-small.jpg',
];

const thumbUrls = [
  'images/thumb/horizontal-large.jpg',
  'images/thumb/horizontal-small.jpg',
  'images/thumb/vertical-large.jpg',
  'images/thumb/vertical-small.jpg',
];

const thumbnails = thumbUrls.map((url, index) => ({
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
      imageUrl={imageUrls[2]}
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
      deleteButton={false}
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
      deleteButton={false}
    />
  )
  .add('delete button', () =>
    <Detail
      imageUrl={imageUrls[1]}
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={4}
      favoriteCount={3}
      favoriteMark={true}
      favoriteUsers={['@aoba_suzukaze', '@hifumi_takimoto', '@yun_iijima']}
      handleFavoriteClick={action('like')}
      deleteButton={true}
      onDelete={action('delete-photo')}
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

storiesOf('AppPhotoButton', module)
  .addDecorator(MuiDecorator)
  .add('default', () => <AddPhotoButton onTouchTap={action('touch')} />);

storiesOf('Drawer', module)
  .addDecorator(MuiDecorator)
  .add('not logged', () =>
    <Drawer
      open={true}
      onRequestChange={action('change')}
      logged={false}
      onTouchTap={action('touch')}
    />
  )
  .add('logged', () =>
    <Drawer
      open={true}
      onRequestChange={action('change')}
      logged={true}
      onTouchTap={action('touch')}
    />
  );
