// @flow
import React from 'react';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import IconFileUpload from 'material-ui/svg-icons/file/file-upload';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const styles = {
  star: {
    // 何かの都合で別の画像に差し替えないといけなくなった場合のことなどを考えて
    // 念のため指定しておく
    width: 80,
    height: 89,
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
  onTouchTap: () => void,
};

function range(n: number) {
  return [...Array(n).keys()];
}

export class Upload extends React.Component {
  state: {
    star: number,
  };
  constructor(props: TProps) {
    super(props);
    this.state = {
      star: 5,
    };
  }
  render = () => {
    const { imageUrl, onTouchTap } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
          <div className="box">
            <Card>
              <CardMedia>
                <img src={imageUrl} alt="" />
              </CardMedia>
              <CardText>
                {/*http://www.irasutoya.com/2015/08/5.html*/}
                <div style={{ textAlign: 'center' }}>
                  {range(5).map(i =>
                    <IconButton style={styles.star}>
                    <img
                      key={i}
                      src={
                        i < this.state.star
                          ? starImageUrlYes[i]
                          : starImageUrlNo[i]
                      }
                      alt=""
                      onTouchTap={() => this.onTouchTap(i)}
                    />
                    </IconButton>
                  )}
                </div>
              </CardText>
              <CardActions>
                <RaisedButton
                  primary
                  label="投稿する"
                  icon={<IconFileUpload />}
                  onTouchTap={onTouchTap}
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
}
