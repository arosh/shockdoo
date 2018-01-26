// @flow
import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

const MuiDecorator = story => (
  <MuiThemeProvider>
    <div className="container-fluid">{story()}</div>
  </MuiThemeProvider>
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
  .addDecorator(MuiDecorator)
  .add('default', () => (
    <AddPhotoButton display={true} onFileSelect={action('touch')} />
  ));

storiesOf('MoreButton', module)
  .addDecorator(MuiDecorator)
  .add('default', () => <MoreButton onClick={action('click')} />);

storiesOf('AppBar', module)
  .addDecorator(MuiDecorator)
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
      logged={true}
      onTitleClick={action('title')}
      onLeftIconButtonClick={action('left-icon')}
      onSignIn={linkTo('AppBar', 'logged')}
      onSignOut={linkTo('AppBar', 'not logged')}
    />
  ));

storiesOf('Detail', module)
  .addDecorator(MuiDecorator)
  .add('default', () => (
    <Detail
      imageUrl={imageUrls[1]}
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={4}
      likeMark={true}
      likeUsers={['@aoba_suzukaze', '@hifumi_takimoto', '@yun_iijima']}
      handleLikeClick={action('like')}
      deleteButton={false}
      triggerRefresh={action('refresh')}
    />
  ))
  .add('not popular', () => (
    <Detail
      imageUrl={imageUrls[2]}
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={2}
      likeCount={0}
      likeMark={false}
      likeUsers={[]}
      handleLikeClick={action('like')}
      deleteButton={false}
      triggerRefresh={action('refresh')}
    />
  ))
  .add('delete button', () => (
    <Detail
      imageUrl={imageUrls[1]}
      userName="@shora_kujira16"
      uploadedAt="2017/07/21"
      starCount={4}
      likeCount={3}
      likeMark={true}
      likeUsers={['@aoba_suzukaze', '@hifumi_takimoto', '@yun_iijima']}
      handleLikeClick={action('like')}
      deleteButton={true}
      onDelete={action('delete-photo')}
      triggerRefresh={action('refresh')}
    />
  ));

storiesOf('Drawer', module)
  .addDecorator(MuiDecorator)
  .add('not logged', () => (
    <Drawer
      open={true}
      onRequestChange={action('change')}
      logged={false}
      onClick={action('touch')}
      uid={123}
    />
  ))
  .add('logged', () => (
    <Drawer
      open={true}
      onRequestChange={action('change')}
      logged={true}
      onClick={action('touch')}
      uid={123}
    />
  ));

storiesOf('Loading', module)
  .addDecorator(MuiDecorator)
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
    <div>
      <NameDialog open={this.state.open} onSubmit={this.onSubmit} />
      <button onClick={() => this.setState({ open: true })}>open</button>
    </div>
  );
}

storiesOf('NameDialog', module)
  .addDecorator(MuiDecorator)
  .add('default', () => <NameDialogEnhance />);

storiesOf('SubmitForm', module)
  .addDecorator(MuiDecorator)
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
  seq: index,
  thumbURL: url,
  userName: '@shora_kujira16',
  createdAt: '2017/07/20',
  star: index % 5 + 1,
  likeCount: (index * 3 + 1) % 5,
  likeMark: index % 2 === 0,
}));

storiesOf('Thumbnails', module)
  .addDecorator(MuiDecorator)
  .add('default', () => (
    <ThumbCollection
      thumbs={thumbnails}
      handleImageClick={action('image')}
      handleLikeClick={action('like')}
      triggerUpdate={action('update')}
      onClickMore={action('more')}
    />
  ));
