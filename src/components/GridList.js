import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

const styles = {
  card: {
    margin: '1em auto',
  },
};

const imageUrl = 'images/IMG_20170614_181803.jpg';

// GridListはイマイチだったので，Cardを並べて実装したい
export default () =>
  <div className="row">
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div className="box">
        <Card style={styles.card}>
          <CardMedia overlay={<CardTitle title="Overlay title" />}>
            <img src={imageUrl} alt="" />
          </CardMedia>
        </Card>
      </div>
    </div>
  </div>;
