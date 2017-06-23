// @flow
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';
import React from 'react';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

export default class Preview extends React.Component {
  render = () =>
    <Card>
      <CardMedia>
        <img src="images/IMG_20170614_181803.jpg" alt="" />
      </CardMedia>
      <CardText>
        <Slider min={1} max={4} step={1} value={4} />
        <TextField hintText="投稿者名" fullWidth={true} />
      </CardText>
      <CardActions>
        <FlatButton primary label="投稿する" icon={<IconFileUpload />} />
      </CardActions>
    </Card>;
}
