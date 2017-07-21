// @flow
import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import IconThumbUp from 'material-ui/svg-icons/action/thumb-up';
import { blue500, gray500, white } from 'material-ui/styles/colors';
import Clearfix from './Clearfix';
import { starImageUrlYes, starImageUrlNo } from '../resources';

const styles = {
  bold: {
    fontWeight: 'bold',
  },
  right: {
    float: 'right',
  },
  center: {
    textAlign: 'center',
    lineHeight: 0,
  },
  likeBox: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  likeIcon: {
    marginRight: 6,
  },
  chip: {
    margin: 4,
  },
  chipBox: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 6,
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
  favoriteCount: number,
  favoriteMark: boolean,
  favoriteUsers: string[],
  handleFavoriteClick: () => void,
};

export function Detail(props: PropsType) {
  const {
    imageUrl,
    userName,
    uploadedAt,
    starCount,
    favoriteCount,
    favoriteMark,
    favoriteUsers,
    handleFavoriteClick,
  } = props;
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
        <div className="box">
          <Card>
            <CardMedia>
              <img src={imageUrl} alt="" />
            </CardMedia>
            <CardText>
              by <span style={styles.bold}>{userName}</span>
              <span style={styles.right}>{uploadedAt}</span>
              <div style={styles.center}>
                {range(5).map(i =>
                  <img
                    key={i}
                    className="upload__star"
                    src={i < starCount ? starImageUrlYes[i] : starImageUrlNo[i]}
                    alt=""
                  />
                )}
              </div>
              <span style={styles.right}>
                <span style={styles.likeBox} onTouchTap={handleFavoriteClick}>
                  <Avatar
                    size={28}
                    backgroundColor={favoriteMark ? blue500 : gray500}
                    color={white}
                    icon={<IconThumbUp />}
                    style={styles.likeIcon}
                  />
                  {favoriteCount > 0 &&
                    <span style={favoriteMark ? { color: blue500 } : {}}>
                      {favoriteCount}
                    </span>}
                </span>
              </span>
              <Clearfix />
              <div style={styles.chipBox}>
                {favoriteUsers.map((name, index) =>
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
                )}
              </div>
            </CardText>
          </Card>
        </div>
      </div>
    </div>
  );
}
