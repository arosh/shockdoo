import React from 'react';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

const styles = {
  card: {
    marginBottom: '1em',
  },
};

const imageUrl = 'images/IMG_20170614_181803.jpg';

// GridListはイマイチだったので，Cardを並べて実装したい
export default () =>
  <div className="row">
    {[1, 2, 3, 4, 5, 6, 7].map(key =>
      <div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="box">
          <Card style={styles.card}>
            <CardMedia overlay={<CardTitle subtitle="by @shora_kujira16" />}>
              <img src={imageUrl} alt="" />
            </CardMedia>
          </Card>
        </div>
      </div>
    )}
  </div>;
