// @flow
import FirebaseUtils from './infra/FirebaseUtils';

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

type Action = {
  type: string,
  payload: any,
};

type Dispatch = Action => void;

export type State = {
  logged: boolean,
  drawerOpened: boolean,
  userId: ?number,
};

const initialState: State = {
  logged: false,
  drawerOpened: false,
  userId: null,
};

const firebase = new FirebaseUtils();

export function signIn(providerName: string) {
  return async (dipatch: Dispatch) => {
    const user = await firebase.signIn(providerName);
    console.log(user);
  };
}

export function setOnSignIn() {
  return (dispatch: Dispatch) => {
    firebase.setOnSignInHandler((userId, userName) => {
      dispatch({
        type: SIGN_IN,
        payload: {
          userId,
        },
      });
    });
  };
}

export function signOut() {
  return async (dispatch: Dispatch) => {
    await firebase.signOut();
  };
}

export function setOnSignOut() {
  return (dispatch: Dispatch) => {
    firebase.setOnSignOutHandler(() => {
      dispatch({
        type: SIGN_OUT,
        payload: null,
      });
    });
  };
}

export function toggleDrawer(open: boolean): Action {
  return {
    type: TOGGLE_DRAWER,
    payload: {
      open,
    },
  };
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        logged: true,
        userId: payload.userId,
      };
    case SIGN_OUT:
      return {
        ...state,
        logged: false,
        userId: null,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpened: payload.open,
      };
    default: {
      return state;
    }
  }
};
