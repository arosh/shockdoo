// @flow
import React from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import IconFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import { red500 } from 'material-ui/styles/colors';

const styles = {
  name: {
    fontWeight: 'bold',
  },
  date: {
    float: 'right',
    fontWeight: 'bold',
  },
  favoriteBox: {
    color: red500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  favoriteIcon: {
    marginRight: 6,
    cursor: 'pointer',
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
  media: {
    lineHeight: 0,
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

const ClearFix = () => <span style={{ display: 'block', clear: 'both' }} />;

export type PropsType = {
  imageUrl: string,
  userId: string,
  uploadedAt: string,
  starCount: number,
  favoriteCount: number,
  favoriteMark: boolean,
};

export function ThumbnailItem(props: PropsType) {
  const {
    imageUrl,
    userId,
    uploadedAt,
    starCount,
    favoriteCount,
    favoriteMark,
  } = props;
  return (
    <Card containerStyle={styles.container}>
      {/*謎の padding-bottom: 8px; が存在するので打ち消す*/}
      <CardMedia style={styles.media}>
        <a href="#">
          <img style={styles.img} src={imageUrl} />
        </a>
      </CardMedia>
      <CardText>
        <span style={styles.name}>
          {userId}
        </span>
        <span style={styles.date}>
          {uploadedAt}
        </span>
        <ClearFix />
        <div style={styles.center}>
          {range(5).map(i =>
            <img
              key={i}
              alt=""
              src={i < starCount ? starImageUrlYes[i] : starImageUrlNo[i]}
              style={styles.grade}
            />
          )}
        </div>
        <div style={styles.favoriteBox}>
          {favoriteMark
            ? <IconFavorite color={red500} style={styles.favoriteIcon} />
            : <IconFavoriteBorder color={red500} style={styles.favoriteIcon} />}
          {favoriteCount > 0 && favoriteCount}
        </div>
      </CardText>
    </Card>
  );
}
