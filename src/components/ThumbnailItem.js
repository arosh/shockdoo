// @flow
import React from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';

const styles = {
  cardText: {
    fontWeight: 'bold',
  },
  pullRight: {
    float: 'right',
  },
};

type TProps = {
  imageUrl: string[],
  userId: string,
  uploadedAt: string,
};

export function ThumbnailItem(props: TProps) {
  const { imageUrl, userId, uploadedAt } = props;
  return (
    <Card>
      <CardMedia>
        <img src={imageUrl} alt="" />
      </CardMedia>
      <CardText style={styles.cardText}>
        by {userId}
        <span style={styles.pullRight}>{uploadedAt}</span>
      </CardText>
    </Card>
  );
}
