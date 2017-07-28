// @flow
import React, { Component } from 'react';

import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import { IconFileUpload } from './icon';
import Clearfix from './Clearfix';
import { starImageUrlYes, starImageUrlNo } from '../resources';

const styles = {
  name: {
    fontWeight: 'bold',
  },
  date: {
    float: 'right',
    // fontWeight: 'bold',
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
  onSubmit: (star: number) => void,
};

export class Upload extends Component {
  state: {
    star: number,
    starHover: number,
  };

  constructor(props: PropsType) {
    super(props);
    this.state = {
      star: 0,
      starHover: 0,
    };
  }

  render = () => {
    const { imageUrl, userName, uploadedAt, onSubmit } = this.props;
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
                <Clearfix />
                <div style={styles.center}>
                  {range(5).map(i =>
                    <IconButton
                      key={i}
                      className="upload__button"
                      onTouchTap={() => this.onTouchTap(i)}
                      onMouseOver={() => this.onMouseOver(i)}
                      onMouseOut={() => this.onMouseOut()}
                    >
                      <img
                        className="upload__star"
                        src={
                          this.starHighlight(i)
                            ? starImageUrlYes[i]
                            : starImageUrlNo[i]
                        }
                      />
                    </IconButton>
                  )}
                </div>
              </CardText>
              <CardActions>
                <RaisedButton
                  primary
                  disabled={this.state.star === 0}
                  label="投稿する"
                  icon={<IconFileUpload />}
                  onTouchTap={() => onSubmit(this.state.star)}
                />
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  onTouchTap = (n: number) => {
    this.setState({
      star: n + 1,
    });
  };

  onMouseOver = (n: number) => {
    this.setState({
      starHover: n + 1,
    });
  };

  onMouseOut = () => {
    this.setState({
      starHover: 0,
    });
  };

  starHighlight = (n: number) => {
    if (this.state.starHover === 0) {
      return n < this.state.star;
    } else {
      return n < this.state.starHover;
    }
  };
}
