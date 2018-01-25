// @flow
import React from 'react';

import * as range from 'lodash.range';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { blue500, grey400, white } from 'material-ui/styles/colors';

import Clearfix from './Clearfix';
import Star from './Star';
import { IconThumbUp, IconDelete } from './icons';

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

type LikeButtonProps = {
  handleLikeClick: () => void,
  likeMark: boolean,
  likeUsers: string[],
};

function LikeButton(props: LikeButtonProps) {
  const { handleLikeClick, likeMark, likeUsers } = props;
  return (
    <span style={styles.likeBox} onClick={() => handleLikeClick()}>
      <Avatar
        size={28}
        backgroundColor={likeMark ? blue500 : grey400}
        color={white}
        icon={<IconThumbUp />}
        style={styles.likeIcon}
      />
      {likeUsers.length > 0 && (
        <span style={{ color: likeMark ? blue500 : grey400 }}>
          {likeUsers.length}
        </span>
      )}
    </span>
  );
}

const LikeChip = ({ name }) => (
  <Chip labelStyle={styles.bold} style={styles.chip}>
    <Avatar backgroundColor={blue500} color={white} icon={<IconThumbUp />} />
    {name}
  </Chip>
);

type PropsType = {
  imageUrl: string,
  userName: string,
  uploadedAt: string,
  starCount: number,
  likeMark: boolean,
  likeUsers: string[],
  handleLikeClick: () => void,
  deleteButton: boolean,
  onDelete?: () => void,
  triggerRefresh: () => void,
};

export default class Detail extends React.Component<PropsType, {}> {
  componentWillMount() {
    this.props.triggerRefresh();
  }
  render = () => {
    const {
      imageUrl,
      userName,
      uploadedAt,
      starCount,
      likeMark,
      likeUsers,
      handleLikeClick,
      deleteButton,
      onDelete,
    } = this.props;
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
                    <Star key={i} level={i} turnOn={i < starCount} />
                  ))}
                </div>
                <span style={styles.right}>
                  <LikeButton
                    handleLikeClick={handleLikeClick}
                    likeMark={likeMark}
                    likeUsers={likeUsers}
                  />
                </span>
                <Clearfix />
                <div style={styles.chipBox}>
                  {likeUsers.map((name, index) => (
                    <LikeChip key={index} name={name} />
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
  };
}
