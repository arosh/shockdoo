// @flow
import React from 'react';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';
import IconStar from 'material-ui/svg-icons/toggle/star';
import IconStarBorder from 'material-ui/svg-icons/toggle/star-border';

// import Slider from 'material-ui/Slider';

const styles = {
  stars: {
    textAlign: 'center',
  },
  largeIcon: {
    width: '72px',
    height: '72px',
  },
  card: {
    maxWidth: '970px',
    margin: '0 auto',
  },
};

export default class Preview extends React.Component {
  render = () =>
    <Card style={styles.card}>
      <CardMedia>
        <img src="images/IMG_20170614_181803.jpg" alt="" />
      </CardMedia>
      <CardText>
        {/*スライダーじゃなくて☆をタッチでいいような気がしてきた*/}
        {/*<Slider min={1} max={4} step={1} value={4} />*/}
        {/*http://www.irasutoya.com/2015/08/5.html*/}
        <div style={styles.stars}>
          <IconStar style={styles.largeIcon} />
          <IconStarBorder style={styles.largeIcon} />
        </div>
      </CardText>
      <CardActions>
        <FlatButton primary label="投稿する" icon={<IconFileUpload />} />
      </CardActions>
    </Card>;
}
