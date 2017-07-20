// @flow
import React from 'react';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';

const styles = {
  center: {
    textAlign: 'center',
  },
};

const starImageUrlYes = [
  'images/stars/star1y.png',
  'images/stars/star2y.png',
  'images/stars/star3y.png',
  'images/stars/star4y.png',
  'images/stars/star5y.png',
];

const starImageUrlNo = [
  'images/stars/star1n.png',
  'images/stars/star2n.png',
  'images/stars/star3n.png',
  'images/stars/star4n.png',
  'images/stars/star5n.png',
];

type TProps = {
  imageUrl: string,
  onSubmit: (star: number) => void,
};

function range(n: number) {
  return [...Array(n).keys()];
}

export class Upload extends React.Component {
  state: {
    star: number,
    starHover: number,
  };

  constructor(props: TProps) {
    super(props);
    this.state = {
      star: 0,
      starHover: 0,
    };
  }

  render = () => {
    const { imageUrl, onSubmit } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
          <div className="box">
            <Card>
              <CardMedia>
                <img src={imageUrl} alt="" />
              </CardMedia>
              <CardText>
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
                        alt=""
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
