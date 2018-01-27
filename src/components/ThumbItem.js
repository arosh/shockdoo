// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import * as range from 'lodash.range';

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
  linkTo: {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export type ThumbItemProps = {
  photoID: string,
  thumbURL: string,
  uid: string,
  userName: string,
  createdAt: string,
  star: number,
  likeCount: number,
  likeMark: boolean,
  handleLikeClick: () => void,
};

export default function ThumbItem(props: ThumbItemProps) {
  const {
    photoID,
    thumbURL,
    uid,
    userName,
    createdAt,
    star,
    likeCount,
    likeMark,
    handleLikeClick,
  } = props;
  return (
    <Card containerStyle={styles.cardContainer}>
      <CardMedia style={styles.cardMedia}>
        <Link to={`/photos/${photoID}`}>
          <img style={styles.img} src={thumbURL} alt="" />
        </Link>
      </CardMedia>
      <CardText>
        by{' '}
        <Link to={`/users/${uid}/photos`} style={styles.linkTo}>
          {userName}
        </Link>
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
          <span style={styles.likeBox} onClick={handleLikeClick}>
            <Avatar
              size={28}
              backgroundColor={likeMark ? blue500 : grey400}
              color={white}
              icon={<IconThumbUp />}
              style={styles.likeIcon}
            />
            {likeCount > 0 && (
              <span style={{ color: likeMark ? blue500 : grey400 }}>
                {likeCount}
              </span>
            )}
          </span>
        </span>
        <Clearfix />
      </CardText>
    </Card>
  );
}
