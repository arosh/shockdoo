// @flow
import { connect } from 'react-redux';
import Component from '../components/Notification';
import type { State } from '../reducer';

export default connect((state: State) => ({
  message: state.notification.message,
  timestamp: state.notification.timestamp,
}))(Component);
