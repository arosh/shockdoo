import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const imageUrl = 'images/IMG_20170614_181803.jpg';

// GridListはイマイチだったので，Cardを並べて実装したい
export default () => <img src={imageUrl} alt="" />;
