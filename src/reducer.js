// @flow
import FirebaseUtils from './infra/FirebaseUtils';

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
const SET_SUBMIT = 'SET_SUBMIT';

type Action = {
  type: string,
  payload: any,
};

type Dispatch = Action => void;

export type State = {
  logged: boolean,
  drawerOpened: boolean,
  userID: ?number,
  userName: ?string,
  submit: {
    fileName: ?string,
    imageURL: ?string,
    createdAt: ?string,
  },
};

const initialState: State = {
  logged: false,
  drawerOpened: false,
  userID: null,
  userName: '@shora_kujira16',
  submit: {
    fileName: '',
    imageURL: null,
    createdAt: null,
  },
};

const firebase = new FirebaseUtils();

export function signIn(providerName: string) {
  return async (dipatch: Dispatch) => {
    firebase.signIn(providerName);
  };
}

export function setOnSignIn() {
  return (dispatch: Dispatch) => {
    firebase.setOnSignInHandler((userID, userName) => {
      dispatch({
        type: SIGN_IN,
        payload: {
          userID,
          userName,
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

export function uploadImage(star: number) {
  return (dispatch: Dispatch, getState: () => State) => {
    const { submit } = getState();
    if (!submit.imageURL) {
      return;
    }
    // https://qiita.com/minodisk/items/24e253bb9f2313621a6b
    // https://qiita.com/TypoScript/items/0d5b08cecf959b8b822c
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const result: ArrayBuffer = xhr.response;
      if (!submit.fileName) {
        return;
      }
      firebase.uploadImage(submit.fileName, result, star);
    };
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', submit.imageURL);
    xhr.send();
  };
}

export function setSubmit(
  fileName: string,
  imageURL: string,
  createdAt: string
): Action {
  return {
    type: SET_SUBMIT,
    payload: {
      fileName,
      imageURL,
      createdAt,
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
        userID: payload.userID,
        userName: payload.userName,
      };
    case SIGN_OUT:
      return {
        ...state,
        logged: false,
        userID: null,
      };
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpened: payload.open,
      };
    case SET_SUBMIT:
      return {
        ...state,
        submit: {
          ...state.submit,
          fileName: payload.fileName,
          imageURL: payload.imageURL,
          createdAt: payload.createdAt,
        },
      };
    default: {
      return state;
    }
  }
};
