// @flow
import React from 'react';
import Media from 'react-media';

import { starImageUrlYes, starImageUrlNo } from './resources';

const styles = {
  starSmall: {
    width: 52,
    height: 59,
  },
  starMedium: {
    width: 78,
    height: 89,
  },
};

type PropsType = {
  level: number,
  turnOn: boolean,
};

export default (props: PropsType) => (
  <Media query={{ minWidth: 768 }}>
    {matches => (
      <img
        style={matches ? styles.starMedium : styles.starSmall}
        src={
          props.turnOn
            ? starImageUrlYes[props.level]
            : starImageUrlNo[props.level]
        }
        alt=""
      />
    )}
  </Media>
);
