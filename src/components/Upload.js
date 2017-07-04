// @flow
import React from 'react';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';

const imageUrl = 'images/foods/IMG_20170628_175750.jpg';

const styles = {
  star: {
    // 何かの都合で別の画像に差し替えないといけなくなった場合のことなどを考えて
    // 念のため指定しておく
    width: 80,
    height: 89,
  },
};

const starImageUrl = [
  [
    'images/stars/star1n.png',
    'images/stars/star2n.png',
    'images/stars/star3n.png',
    'images/stars/star4n.png',
  ],
  [
    'images/stars/star1y.png',
    'images/stars/star2y.png',
    'images/stars/star3y.png',
    'images/stars/star4y.png',
  ],
];

export default class Upload extends React.Component {
  render = () =>
    <div className="row">
      <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
        <div className="box">
          <Card>
            <CardMedia>
              <img src={imageUrl} alt="" />
            </CardMedia>
            <CardText>
              {/*http://www.irasutoya.com/2015/08/5.html*/}
              <div style={{ textAlign: 'center' }}>
                <img src={starImageUrl[1][0]} alt="" style={styles.star} />
                <img src={starImageUrl[1][1]} alt="" style={styles.star} />
                <img src={starImageUrl[1][2]} alt="" style={styles.star} />
                <img src={starImageUrl[1][3]} alt="" style={styles.star} />
              </div>
            </CardText>
            <CardActions>
              <FlatButton primary label="投稿する" icon={<IconFileUpload />} />
            </CardActions>
          </Card>
        </div>
      </div>
    </div>;
}
