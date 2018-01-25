// @flow
import React from 'react';

import { Card, CardMedia, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import { blue500, white, grey400 } from 'material-ui/styles/colors';

import Clearfix from './Clearfix';
import { IconThumbUp } from './icons';
import { starImageUrlYes, starImageUrlNo } from './resources';

const styles = {
  bold: {
    fontWeight: 'bold',
  },
  right: {
    float: 'right',
  },
  likeBox: {
    // alignItemsを使いたいので
    display: 'flex',
    // アイコンとテキストの縦方向の位置を合わせるために上下中央揃えにする
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
    // flexで実現しようとするとなぜかimgが縦長になる
    textAlign: 'center',
    // 改行文字を入れると下側に謎の余白ができる
    // http://d.hatena.ne.jp/nug/20070501/1178016623
    lineHeight: 0,
  },
  cardContainer: {
    // CardActionsを設定していないと謎の空白ができてしまう
    paddingBottom: 0,
  },
  img: {
    width: '100%',
  },
  cardMedia: {
    // 改行文字による余白防止
    lineHeight: 0,
  },
};

function range(n: number) {
  return [...Array(n).keys()];
}

export type ThumbItemProps = {
  thumbURL: string,
  userName: string,
  createdAt: string,
  star: number,
  favoriteCount: number,
  favoriteMark: boolean,
  handleImageClick: () => void,
  handleFavoriteClick: () => void,
};

export default function ThumbItem(props: ThumbItemProps) {
  const {
    thumbURL,
    userName,
    createdAt,
    star,
    favoriteCount,
    favoriteMark,
    handleImageClick,
    handleFavoriteClick,
  } = props;
  return (
    <Card containerStyle={styles.cardContainer}>
      <CardMedia style={styles.cardMedia}>
        <img
          style={styles.img}
          src={thumbURL}
          alt=""
          onClick={handleImageClick}
        />
      </CardMedia>
      <CardText>
        by <span style={styles.bold}>{userName}</span>
        <span style={styles.right}>{createdAt}</span>
        <Clearfix />
        <div style={styles.starBox}>
          {range(5).map(i => (
            <img
              key={i}
              alt=""
              src={i < star ? starImageUrlYes[i] : starImageUrlNo[i]}
              style={styles.starImage}
            />
          ))}
        </div>
        <span style={styles.right}>
          <span style={styles.likeBox} onClick={handleFavoriteClick}>
            <Avatar
              size={28}
              backgroundColor={favoriteMark ? blue500 : grey400}
              color={white}
              icon={<IconThumbUp />}
              style={styles.likeIcon}
            />
            {favoriteCount > 0 && (
              <span style={{ color: favoriteMark ? blue500 : grey400 }}>
                {favoriteCount}
              </span>
            )}
          </span>
        </span>
        <Clearfix />
      </CardText>
    </Card>
  );
}
