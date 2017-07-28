// @flow
import { createAction } from 'redux-actions';

const signInAction = createAction('LOGIN');

export function signIn(providerName: string) {
  return (dispatch: any) => {
    return dispatch(signInAction());
  };
}

const signOutAction = createAction('LOGOUT');

export function signOut() {
  return (dispatch: any) => {
    return dispatch(signOutAction());
  };
}

export const toggleDrawer = createAction('TOGGLE_DRAWER', open => ({
  open,
}));
