// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { handleActions } from 'redux-actions';
import thunk from 'redux-thunk';

type StoreType = {
  logged: boolean,
  drawerOpened: boolean,
  userId?: number,
};

const initialState: StoreType = {
  logged: false,
  drawerOpened: false,
};

const rootReducer = handleActions(
  {
    LOGIN: (state, { payload }) => ({
      ...state,
      logged: true,
      userId: payload.userId,
    }),
    LOGOUT: state => ({ ...state, logged: false }),
    TOGGLE_DRAWER: (state, { payload }) => ({
      ...state,
      drawerOpened: payload.open,
    }),
  },
  initialState
);

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
