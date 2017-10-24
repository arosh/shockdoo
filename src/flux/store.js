// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { handleActions } from 'redux-actions';
import thunk from 'redux-thunk';

type State = {
  logged: boolean,
  drawerOpened: boolean,
  userId?: number,
};

const initialState: State = {
  logged: false,
  drawerOpened: false,
};

export default createStore(
  handleActions(
    {
      SIGN_IN: (state, { payload }) => ({
        ...state,
        logged: true,
        userId: payload.userId,
      }),
      SIGN_OUT: state => ({
        ...state,
        logged: false,
      }),
      TOGGLE_DRAWER: (state, { payload }) => ({
        ...state,
        drawerOpened: payload.open,
      }),
    },
    initialState
  ),
  composeWithDevTools(applyMiddleware(thunk))
);
