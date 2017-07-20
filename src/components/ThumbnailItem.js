// @flow
import React from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';

const starImageUrlYes = [
  'images/stars/star1y.png',
  'images/stars/star2y.png',
  'images/stars/star3y.png',
  'images/stars/star4y.png',
  'images/stars/star5y.png',
];

const starImageUrlNo = [
  'images/stars/star1n.png',
  'images/stars/star2n.png',
  'images/stars/star3n.png',
  'images/stars/star4n.png',
  'images/stars/star5n.png',
];

const styles = {
  cardText: {
    fontWeight: 'bold',
  },
  pullRight: {
    float: 'right',
  },
  grade: {
    width: 39,
  },
  center: {
    textAlign: 'center',
  },
};

function range(n: number) {
  return [...Array(n).keys()];
}

type TProps = {
  imageUrl: string,
  userId: string,
  uploadedAt: string,
  star: number,
};

export function ThumbnailItem(props: TProps) {
  const { imageUrl, userId, uploadedAt, star } = props;
  return (
    <Card>
      <CardMedia>
        <img src={imageUrl} alt="" />
      </CardMedia>
      <CardText style={styles.cardText}>
        <span style={styles.pullRight}>
          {uploadedAt}
        </span>
        <span>
          by {userId}
        </span>
        <div style={styles.center}>
          {range(5).map(i =>
            <img
              key={i}
              alt=""
              src={i < star ? starImageUrlYes[i] : starImageUrlNo[i]}
              style={styles.grade}
            />
          )}
        </div>
      </CardText>
    </Card>
  );
}
