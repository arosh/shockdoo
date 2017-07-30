// @flow
import { createAction } from 'redux-actions';
import FirebaseUtils from '../infra/FirebaseUtils';

const firebase = new FirebaseUtils();

const signInAction = createAction('SIGN_IN', (userId: number) => ({
  userId,
}));

export function signIn(providerName: string) {
  return async (dispatch: any => void) => {
    const user = await firebase.signIn(providerName);
    console.log(user);
  };
}

export function setOnSignIn() {
  return (dispatch: any => void) => {
    firebase.setOnSignIn((userId, userName) => {
      dispatch(signInAction(userId));
    });
  };
}

const signOutAction = createAction('SIGN_OUT');

export function signOut() {
  return async (dispatch: any => void) => {
    await firebase.signOut();
  };
}

export function setOnSignOut() {
  return (dispatch: any => void) => {
    firebase.setOnSignOut(() => {
      dispatch(signOutAction());
    });
  };
}

export const toggleDrawer = createAction('TOGGLE_DRAWER', open => ({
  open,
}));
