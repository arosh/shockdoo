// @flow
import React from 'react';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, grey400, white } from 'material-ui/styles/colors';

import Clearfix from './Clearfix';
import { IconThumbUp, IconDelete } from './icons';
import { starImageUrlYes, starImageUrlNo } from '../resources';

const styles = {
  bold: {
    fontWeight: 'bold',
  },
  right: {
    float: 'right',
  },
  center: {
    // flexだとうまくいかない
    textAlign: 'center',
    // 改行文字による余白防止
    lineHeight: 0,
  },
  // お気に入り登録のためのボタンと登録数を表示するdiv
  likeBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  // お気に入り登録のためのボタンのアイコン
  likeIcon: {
    marginRight: 6,
  },
  chip: {
    margin: 4,
  },
  // お気に入り登録をしている人一覧を収納するdiv
  chipBox: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 6,
  },
  cardContainer: {
    // CardActionsを設定していないと謎の空白ができてしまう
    paddingBottom: 0,
  },
};

function range(n: number) {
  return [...Array(n).keys()];
}

type PropsType = {
  imageUrl: string,
  userName: string,
  uploadedAt: string,
  starCount: number,
  favoriteMark: boolean,
  favoriteUsers: string[],
  handleFavoriteClick: () => void,
  deleteButton: boolean,
  onDelete?: () => void,
};

export default function Detail(props: PropsType) {
  const {
    imageUrl,
    userName,
    uploadedAt,
    starCount,
    favoriteMark,
    favoriteUsers,
    handleFavoriteClick,
    deleteButton,
    onDelete,
  } = props;
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
        <div className="box">
          <Card containerStyle={styles.cardContainer}>
            <CardMedia>
              <img src={imageUrl} alt="" />
            </CardMedia>
            <CardText>
              by <span style={styles.bold}>{userName}</span>
              <span style={styles.right}>{uploadedAt}</span>
              <div style={styles.center}>
                {range(5).map(i => (
                  <img
                    key={i}
                    className="upload__star"
                    src={i < starCount ? starImageUrlYes[i] : starImageUrlNo[i]}
                    alt=""
                  />
                ))}
              </div>
              <span style={styles.right}>
                <span
                  style={styles.likeBox}
                  onClick={() => handleFavoriteClick()}
                >
                  <Avatar
                    size={28}
                    backgroundColor={favoriteMark ? blue500 : grey400}
                    color={white}
                    icon={<IconThumbUp />}
                    style={styles.likeIcon}
                  />
                  {favoriteUsers.length > 0 && (
                    <span style={{ color: favoriteMark ? blue500 : grey400 }}>
                      {favoriteUsers.length}
                    </span>
                  )}
                </span>
              </span>
              <Clearfix />
              <div style={styles.chipBox}>
                {favoriteUsers.map((name, index) => (
                  <Chip
                    key={index}
                    labelStyle={styles.bold}
                    style={styles.chip}
                  >
                    <Avatar
                      backgroundColor={blue500}
                      color={white}
                      icon={<IconThumbUp />}
                    />
                    {name}
                  </Chip>
                ))}
              </div>
            </CardText>
            {deleteButton && (
              <CardActions>
                <RaisedButton
                  secondary
                  label="削除する"
                  icon={<IconDelete />}
                  onClick={() => onDelete && onDelete()}
                />
              </CardActions>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
