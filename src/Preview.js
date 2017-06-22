import React from 'react';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';
import TextField from 'material-ui/TextField';
import Upload from './Upload';

export default class Preview extends React.Component {
  render = () =>
    <Card>
      <CardMedia>
        <img src="images/IMG_20170614_181803.jpg" />
      </CardMedia>
      <CardText>
        <Upload />
        <TextField hintText="投稿者名" fullWidth={true} />
      </CardText>
      <CardActions>
        <FlatButton primary label="投稿する" icon={<IconFileUpload />} />
      </CardActions>
    </Card>;
}
