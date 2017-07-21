// @flow
import React from 'react';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import { red500 } from 'material-ui/styles/colors';
import { starImageUrlYes, starImageUrlNo } from '../resources';

const styles = {
  name: {
    fontWeight: 'bold',
  },
  date: {
    float: 'right',
  },
  center: {
    textAlign: 'center',
    lineHeight: 0,
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
              by <span style={styles.name}>{userName}</span>
              <span style={styles.date}>{uploadedAt}</span>
              <div style={styles.center}>
                {range(5).map(i =>
                  <IconButton key={i} className="upload__button">
                    <img
                      className="upload__star"
                      src={
                        i < starCount ? starImageUrlYes[i] : starImageUrlNo[i]
                      }
                      alt=""
                    />
                  </IconButton>
                )}
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {favoriteUsers.map(name =>
                  <Chip labelStyle={{fontWeight: 'bold'}} style={{margin: 4}}>
                    <Avatar icon={<IconFavoriteBorder />} />
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
