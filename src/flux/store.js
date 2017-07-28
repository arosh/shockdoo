// @flow
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { handleActions } from 'redux-actions';
import thunk from 'redux-thunk';

type StoreType = {
  logged: boolean,
  drawerOpened: boolean,
};

const initialState: StoreType = {
  logged: false,
  drawerOpened: false,
};

const rootReducer = handleActions(
  {
    LOGIN: state => ({ logged: true }),
    LOGOUT: state => ({ logged: false }),
    TOGGLE_DRAWER: (state, { payload }) => ({ drawerOpened: payload.open }),
  },
  initialState
);

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
