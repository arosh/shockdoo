// @flow
import React from 'react';

import { Card, CardMedia, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { blue500, white, grey400 } from 'material-ui/styles/colors';

import Clearfix from './Clearfix';
import { IconThumbUp } from '../icons';
import { starImageUrlYes, starImageUrlNo } from '../resources';

const styles = {
  bold: {
    fontWeight: 'bold',
  },
  right: {
    float: 'right',
  },
  likeBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  likeIcon: {
    marginRight: 6,
  },
  starImage: {
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
              style={styles.starImage}
            />
          )}
        </div>
        <span style={styles.right}>
          <span style={styles.likeBox} onTouchTap={handleFavoriteClick}>
            <Avatar
              size={28}
              backgroundColor={favoriteMark ? blue500 : grey400}
              color={white}
              icon={<IconThumbUp />}
              style={styles.likeIcon}
            />
            {favoriteCount > 0 &&
              <span style={{ color: favoriteMark ? blue500 : grey400 }}>
                {favoriteCount}
              </span>}
          </span>
        </span>
        <Clearfix />
      </CardText>
    </Card>
  );
}
