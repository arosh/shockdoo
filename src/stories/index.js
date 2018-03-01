// @flow
import * as React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { MemoryRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import AddPhotoButton from '../components/AddPhotoButton';
import MoreButton from '../components/MoreButton';
import AppBar from '../components/AppBar';
import Detail from '../components/Detail';
import Drawer from '../components/Drawer';
import Loading from '../components/Loading';
import NameDialog from '../components/NameDialog';
import ThumbCollection from '../components/ThumbCollection';
import SubmitForm from '../components/SubmitForm';

import '../bootstrap';

const Decorator = story => (
  <MemoryRouter>
    <MuiThemeProvider>
      <div className="container-fluid">{story()}</div>
    </MuiThemeProvider>
  </MemoryRouter>
);

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

storiesOf('AddPhotoButton', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <AddPhotoButton display onFileSelect={action('touch')} />
  ));

storiesOf('MoreButton', module)
  .addDecorator(Decorator)
  .add('default', () => <MoreButton onClick={action('click')} />);

storiesOf('AppBar', module)
  .addDecorator(Decorator)
  .add('not logged', () => (
    <AppBar
      logged={false}
      onTitleClick={action('title')}
      onLeftIconButtonClick={action('left-icon')}
      onSignIn={linkTo('AppBar', 'logged')}
      onSignOut={linkTo('AppBar', 'not logged')}
    />
  ))
  .add('logged', () => (
    <AppBar
      logged
      onTitleClick={action('title')}
      onLeftIconButtonClick={action('left-icon')}
      onSignIn={linkTo('AppBar', 'logged')}
      onSignOut={linkTo('AppBar', 'not logged')}
    />
  ));

const users = [
  { uid: '1', userName: '@aoba_suzukaze' },
  { uid: '2', userName: '@hifumi_takimoto' },
  { uid: '3', userName: '@yun_iijima' },
];

storiesOf('Detail', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <Detail
      imageUrl={imageUrls[1]}
      uid="114514"
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={4}
      likeMark
      likeUsers={users}
      deleteButton={false}
      triggerRefresh={action('refresh')}
      handleLikeClick={action('like')}
      handleDelete={action('delete-photo')}
    />
  ))
  .add('not popular', () => (
    <Detail
      imageUrl={imageUrls[2]}
      uid="114514"
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={2}
      likeCount={0}
      likeMark={false}
      likeUsers={[]}
      deleteButton={false}
      triggerRefresh={action('refresh')}
      handleLikeClick={action('like')}
      handleDelete={action('delete-photo')}
    />
  ))
  .add('delete button', () => (
    <Detail
      imageUrl={imageUrls[1]}
      uid="114514"
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={4}
      likeCount={3}
      likeMark
      likeUsers={users}
      deleteButton
      triggerRefresh={action('refresh')}
      handleLikeClick={action('like')}
      handleDelete={action('delete-photo')}
    />
  ));

storiesOf('Drawer', module)
  .addDecorator(Decorator)
  .add('not logged', () => (
    <Drawer
      open
      onRequestChange={action('change')}
      logged={false}
      onClick={action('touch')}
      uid={123}
    />
  ))
  .add('logged', () => (
    <Drawer
      open
      onRequestChange={action('change')}
      logged
      onClick={action('touch')}
      uid={123}
    />
  ));

storiesOf('Loading', module)
  .addDecorator(Decorator)
  .add('default', () => <Loading />);

class NameDialogEnhance extends React.Component<{}, { open: boolean }> {
  state = {
    open: false,
  };
  onSubmit = (name: string) => {
    this.setState({
      open: false,
    });
    action('submit')(name);
  };
  render = () => (
    <React.Fragment>
      <NameDialog open={this.state.open} onSubmit={this.onSubmit} />
      <button onClick={() => this.setState({ open: true })}>open</button>
    </React.Fragment>
  );
}

storiesOf('NameDialog', module)
  .addDecorator(Decorator)
  .add('default', () => <NameDialogEnhance />);

storiesOf('SubmitForm', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <SubmitForm
      imageUrl={imageUrls[2]}
      userName="@shora_kujira16"
      createdAt="2017/07/21"
      onSubmit={action('upload')}
      hideLoading={action('hideLoading')}
    />
  ));

const thumbnails = thumbUrls.map((url, index) => ({
  photoID: index.toFixed(),
  thumbURL: url,
  uid: '114514',
  userName: '@shora_kujira16',
  createdAt: '2017/07/20',
  star: index % 5 + 1,
  likeCount: (index * 3 + 1) % 5,
  likeMark: index % 2 === 0,
}));

storiesOf('Thumbnails', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <ThumbCollection
      thumbs={thumbnails}
      handleImageClick={action('image')}
      handleLikeClick={action('like')}
      triggerUpdate={action('update')}
      onClickMore={action('more')}
    />
  ));
