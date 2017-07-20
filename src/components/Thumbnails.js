// @flow
import React from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';

const styles = {
  card: {
    marginBottom: '1em',
  },
  cardText: {
    fontWeight: 'bold',
  },
  pullRight: {
    float: 'right',
  },
};

const imageUrls = [
  'images/foods/IMG_20170311_113428.jpg',
  'images/foods/IMG_20170425_190325.jpg',
  'images/foods/IMG_20170517_183600.jpg',
  'images/foods/IMG_20170607_183134.jpg',
  'images/foods/IMG_20170614_181803.jpg',
  'images/foods/IMG_20170628_175750.jpg',
];

// GridListはイマイチだったので，Cardを並べて実装したい
export default () =>
  <div className="row">
    {[0, 1, 2, 3, 4, 5, 6].map(key =>
      <div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <div className="box">
          <Card style={styles.card}>
            <CardMedia>
              <img src={imageUrls[key % imageUrls.length]} alt="" />
            </CardMedia>
            <CardText style={styles.cardText}>
              by @shora_kujira16
              <span style={styles.pullRight}>2017/07/04</span>
            </CardText>
          </Card>
        </div>
      </div>
    )}
  </div>;
