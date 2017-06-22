import React from 'react';
import Slider from 'material-ui/Slider';

export default class Upload extends React.Component {
  render = () => <Slider min={1} max={4} step={1} value={4} />;
}
