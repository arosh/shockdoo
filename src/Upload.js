import React from 'react';
import Slider from 'material-ui/Slider';

const styles = {
  upload: {
    margin: "0 20px",
  },
};

export default class Upload extends React.Component {
  render = () => (
    <div style={styles.upload}>
      <Slider min={1} max={4} step={1} value={4} />
    </div>
  )
}
