// @flow
import React from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import IconFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import { red500 } from 'material-ui/styles/colors';
import Clearfix from './Clearfix';
import { starImageUrlYes, starImageUrlNo } from '../resources';

const styles = {
  bold: {
    fontWeight: 'bold',
  },
  right: {
    float: 'right',
  },
  favoriteBox: {
    color: red500,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  favoriteIcon: {
    marginRight: 6,
  },
  starCount: {
    width: 39,
  },
  starBox: {
    textAlign: 'center',
    // 改行文字を入れたときの空白があると下側に謎の空白ができる
    // http://d.hatena.ne.jp/nug/20070501/1178016623
    lineHeight: 0,
  },
  cardContainer: {
    paddingBottom: 0,
  },
  img: {
    width: '100%',
  },
  cardMedia: {
    lineHeight: 0,
  },
};

function range(n: number) {
  return [...Array(n).keys()];
}

export type PropsType = {
  imageUrl: string,
  userName: string,
  uploadedAt: string,
  starCount: number,
  favoriteCount: number,
  favoriteMark: boolean,
  handleFavoriteClick: () => void,
};

export function ThumbnailItem(props: PropsType) {
  const {
    imageUrl,
    userName,
    uploadedAt,
    starCount,
    favoriteCount,
    favoriteMark,
    handleFavoriteClick,
  } = props;
  return (
    <Card containerStyle={styles.cardContainer}>
      {/*謎の padding-bottom: 8px; が存在するので打ち消す*/}
      <CardMedia style={styles.cardMedia}>
        <a href="#">
          <img style={styles.img} src={imageUrl} alt="" />
        </a>
      </CardMedia>
      <CardText>
        by <span style={styles.bold}>{userName}</span>
        <span style={styles.right}>{uploadedAt}</span>
        <Clearfix />
        <div style={styles.starBox}>
          {range(5).map(i =>
            <img
              key={i}
              alt=""
              src={i < starCount ? starImageUrlYes[i] : starImageUrlNo[i]}
              style={styles.starCount}
            />
          )}
        </div>
        <span style={styles.right}>
          <span style={styles.favoriteBox} onTouchTap={handleFavoriteClick}>
            {favoriteMark
              ? <IconFavorite color={red500} style={styles.favoriteIcon} />
              : <IconFavoriteBorder
                  color={red500}
                  style={styles.favoriteIcon}
                />}
            {favoriteCount > 0 && favoriteCount}
          </span>
        </span>
        <Clearfix />
      </CardText>
    </Card>
  );
}
