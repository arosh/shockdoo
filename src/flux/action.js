// @flow
import { createAction } from 'redux-actions';
import FirebaseUtils from '../infra/FirebaseUtils';

const firebase = new FirebaseUtils();

const signInAction = createAction('LOGIN', userId => ({
  userId,
}));

export function signIn(providerName: string) {
  return async (dispatch: any) => {
    const userId = await firebase.signIn(providerName);
    return dispatch(signInAction(123));
  };
}

const signOutAction = createAction('LOGOUT');

export function signOut() {
  return async (dispatch: any) => {
    await firebase.signOut();
    return dispatch(signOutAction());
  };
}

export const toggleDrawer = createAction('TOGGLE_DRAWER', open => ({
  open,
}));
