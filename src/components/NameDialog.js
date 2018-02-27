// @flow
import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const MAX_LENGTH = 20;

type InputProps = {
  name: string,
  onChange: (name: string) => void,
  errorText: string,
};

class Input extends React.Component<InputProps, {}> {
  componentDidMount() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }
  inputRef: ?HTMLInputElement;
  render = () => (
    <TextField
      hintText="アカウントの表示名（20文字以内）"
      fullWidth
      value={this.props.name}
      ref={elem => {
        this.inputRef = elem;
      }}
      errorText={this.props.errorText}
      onChange={e => this.props.onChange(e.target.value)}
    />
  );
}

type NameDialogProps = {
  open: boolean,
  onSubmit: (name: string) => void,
};

type NameDialogState = {
  name: string,
};

class NameDialog extends React.Component<NameDialogProps, NameDialogState> {
  state = {
    name: '',
  };

  onClick = () => {
    this.props.onSubmit(this.state.name);
    this.setState({
      name: '',
    });
  };

  render = () => {
    const actions = [
      <FlatButton
        label="送信"
        primary
        onClick={this.onClick}
        disabled={
          this.state.name.length === 0 || this.state.name.length > MAX_LENGTH
        }
      />,
    ];

    return (
      <Dialog
        title="アカウントの表示名を入力してください。"
        actions={actions}
        modal
        open={this.props.open}
      >
        <Input
          name={this.state.name}
          onChange={name => this.setState({ name })}
          errorText={
            this.state.name.length > MAX_LENGTH
              ? 'アカウントの表示名は20文字以内で入力して下さい。'
              : ''
          }
        />
      </Dialog>
    );
  };
}

export default NameDialog;
