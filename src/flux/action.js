// @flow
import { createAction } from 'redux-actions';
import FirebaseUtils from '../infra/FirebaseUtils';

const firebase = new FirebaseUtils();

const signInAction = createAction('SIGN_IN', (userId: number) => ({
  userId,
}));

export function signIn(providerName: string) {
  return async (dispatch: any) => {
    const user = await firebase.signIn(providerName);
    console.log(user);
    return dispatch(signInAction(user.userId));
  };
}

export function signInIfLogged() {}

const signOutAction = createAction('SIGN_OUT');

export function signOut() {
  return async (dispatch: any) => {
    await firebase.signOut();
    return dispatch(signOutAction());
  };
}

export const toggleDrawer = createAction('TOGGLE_DRAWER', open => ({
  open,
}));
