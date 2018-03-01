// @flow
import React from 'react';
import Media from 'react-media';

import * as range from 'lodash.range';

import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

import { IconFileUpload } from './icons';
import Clearfix from './Clearfix';
import Star from './Star';

const styles = {
  bold: {
    fontWeight: 'bold',
  },
  right: {
    float: 'right',
  },
  center: {
    // flexで実現しようとするとなぜかimgが縦長になる
    textAlign: 'center',
    // 改行文字を入れると下側に謎の余白ができる
    // http://d.hatena.ne.jp/nug/20070501/1178016623
    lineHeight: 0,
  },
  iconButtonSmall: {
    width: 52,
    height: 59,
    padding: 0,
  },
  iconButtonMedium: {
    width: 78,
    height: 89,
    padding: 0,
  },
};

type SubmitFormProps = {
  imageUrl: string,
  userName: string,
  createdAt: string,
  onSubmit: (star: number) => void,
  hideLoading: () => void,
};

type SubmitFormState = {
  star: number,
  starHover: number,
};

export default class SubmitForm extends React.Component<
  SubmitFormProps,
  SubmitFormState
> {
  state = {
    star: 0,
    starHover: 0,
  };

  componentWillMount() {
    this.props.hideLoading();
  }

  onClick = (n: number) => {
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
    }
    return n < this.state.starHover;
  };

  render = () => {
    const { imageUrl, userName, createdAt, onSubmit } = this.props;
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
                <span style={styles.right}>{createdAt}</span>
                <Clearfix />
                <div style={styles.center}>
                  <Media query={{ minWidth: 768 }}>
                    {matches =>
                      range(5).map(i => (
                        <IconButton
                          key={i}
                          style={
                            matches
                              ? styles.iconButtonMedium
                              : styles.iconButtonSmall
                          }
                          onClick={() => this.onClick(i)}
                          onMouseOver={() => this.onMouseOver(i)}
                          onFocus={() => this.onMouseOver(i)}
                          onMouseOut={() => this.onMouseOut()}
                          onBlur={() => this.onMouseOut()}
                        >
                          <Star level={i} turnOn={this.starHighlight(i)} />
                        </IconButton>
                      ))
                    }
                  </Media>
                </div>
              </CardText>
              <CardActions>
                <RaisedButton
                  primary
                  disabled={this.state.star === 0}
                  label="投稿する"
                  icon={<IconFileUpload />}
                  onClick={() => onSubmit(this.state.star)}
                />
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  };
}
