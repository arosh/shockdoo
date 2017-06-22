import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

export default class Eval extends React.Component {
  state: {
    value: string,
  };
  state = { value: 4 };
  handleChange = (event, index, value) => this.setState({ value });
  render = () =>
    <SelectField
      floatingLabelText="評価"
      value={this.state.value}
      onChange={this.handleChange}
    >
      <MenuItem value={4}>
        <FontIcon className="muidocs-icon-action-home" /> あああ
      </MenuItem>
      <MenuItem value={3} primaryText="Weeknights" />
      <MenuItem value={2} primaryText="Every Night" />
      <MenuItem value={1} primaryText="Never" />
    </SelectField>;
}
