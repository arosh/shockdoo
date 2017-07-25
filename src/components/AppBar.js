import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';

export function AppBar(props) {
  return (
    <MaterialAppBar
      title="Title"
      iconClassNameRight="muidocs-icon-navigation-expand-more"
      iconElementLeft={null}
    />
  );
}
