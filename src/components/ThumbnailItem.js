// @flow
import React from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';

const styles = {
  name: {
    fontWeight: 'bold',
    display: 'block',
  },
  date: {
    float: 'right',
    fontWeight: 'bold',
  },
  grade: {
    width: 39,
  },
  center: {
    textAlign: 'center',
    // 改行文字を入れたときの空白があると下側に謎の空白ができる
    // http://d.hatena.ne.jp/nug/20070501/1178016623
    lineHeight: 0,
  },
  container: {
    paddingBottom: 0,
  },
  img: {
    width: '100%',
  },
};

function range(n: number) {
  return [...Array(n).keys()];
}

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

type TProps = {
  imageUrl: string,
  userId: string,
  uploadedAt: string,
  star: number,
};

export function ThumbnailItem(props: TProps) {
  const { imageUrl, userId, uploadedAt, star } = props;
  return (
    <Card containerStyle={styles.container}>
      {/*謎の padding-bottom: 8px; が存在するので打ち消す*/}
      <CardMedia>
        <a href="#">
          <img style={styles.img} src={imageUrl} />
        </a>
      </CardMedia>
      <CardText>
        <span style={styles.date}>
          {uploadedAt}
        </span>
        <span style={styles.name}>
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
