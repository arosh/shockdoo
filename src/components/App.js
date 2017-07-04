// @flow
import Navigation from './Navigation';
import Preview from './Preview';
import GridList from './GridList';

import React from 'react';

export default () =>
  <div className="row">
    <GridList />
    <Preview />
    <Navigation />
  </div>;
