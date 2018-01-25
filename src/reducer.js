// @flow
import { singleton as firebase } from './infrastructure/FirebaseUtils';
import type { Photo } from './types';

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
const SET_SUBMIT = 'SET_SUBMIT';
const SET_NAME_DIALOG_OPEN = 'SET_NAME_DIALOG_OPEN';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_PHOTOS = 'SET_PHOTOS';
const SET_LOADING = 'SET_LOADING';
const NOTIFY = 'NOTIFY';

type Action = {
  type: string,
  payload: any,
};

// type Dispatch = Action => void;
type Dispatch = (Action | (Dispatch => void)) => void;

export type State = {
  logged: boolean,
  loading: boolean,
  drawerOpened: boolean,
  userID: ?number,
  userName: ?string,
  nameDialogOpen: boolean,
  photos: Photo[],
  submit: {
    fileType: ?string,
    imageURL: ?string,
    createdAt: ?string,
  },
  notification: {
    message: string,
    timestamp: number,
  },
};

const initialState: State = {
  logged: false,
  loading: true,
  drawerOpened: false,
  userID: null,
  userName: null,
  nameDialogOpen: false,
  photos: [],
  submit: {
    fileType: null,
    imageURL: null,
    createdAt: null,
  },
  notification: {
    message: '',
    timestamp: 0,
  },
};

export function signIn(providerName: string) {
  return async (dispatch: Dispatch) => {
    const isNewUser = await firebase.signIn(providerName);
    dispatch({
      type: NOTIFY,
      payload: {
        message: 'ログインしました',
      },
    });
    if (isNewUser) {
      dispatch({
        type: SET_NAME_DIALOG_OPEN,
        payload: {
          open: true,
        },
      });
    }
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
    dispatch({
      type: NOTIFY,
      payload: {
        message: 'ログアウトしました',
      },
    });
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
      console.log('submit.imageURL is null.');
      return;
    }
    // https://qiita.com/minodisk/items/24e253bb9f2313621a6b
    // https://qiita.com/TypoScript/items/0d5b08cecf959b8b822c
    const xhr = new XMLHttpRequest();
    xhr.onload = async () => {
      const result: ArrayBuffer = xhr.response;
      if (!submit.fileType) {
        console.log('submit.fileType is null.');
        return;
      }
      const uploadPromise = firebase.uploadImage(submit.fileType, result, star);
      dispatch({
        type: NOTIFY,
        payload: {
          message: 'アップロードしています',
        },
      });
      await uploadPromise;
      dispatch({
        type: NOTIFY,
        payload: {
          message: 'アップロードしました',
        },
      });
      dispatch(updatePhotos());
    };
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', submit.imageURL);
    xhr.send();
  };
}

export function setSubmit(
  fileType: string,
  imageURL: string,
  createdAt: string
): Action {
  return {
    type: SET_SUBMIT,
    payload: {
      fileType,
      imageURL,
      createdAt,
    },
  };
}

export function setUserName(userName: string) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_NAME_DIALOG_OPEN,
      payload: {
        open: false,
      },
    });
    await firebase.setUserName(userName);
    dispatch({
      type: SET_USER_NAME,
      payload: {
        userName,
      },
    });
    dispatch({
      type: NOTIFY,
      payload: {
        message: 'アカウントの表示名を設定しました',
      },
    });
  };
}

export function updatePhotos() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        loading: true,
      },
    });
    firebase.getPhotos().then(photos => {
      dispatch({
        type: SET_PHOTOS,
        payload: {
          photos,
        },
      });
    });
  };
}

export function hideLoading() {
  return {
    type: SET_LOADING,
    payload: {
      loading: false,
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
        userName: null,
      };
    case SET_USER_NAME:
      return {
        ...state,
        userName: payload.userName,
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
          fileType: payload.fileType,
          imageURL: payload.imageURL,
          createdAt: payload.createdAt,
        },
      };
    case SET_NAME_DIALOG_OPEN:
      return {
        ...state,
        nameDialogOpen: payload.open,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    case SET_PHOTOS:
      return {
        ...state,
        loading: false,
        photos: payload.photos,
      };
    case NOTIFY:
      return {
        ...state,
        notification: {
          message: payload.message,
          timestamp: state.notification.timestamp + 1,
        },
      };
    default: {
      return state;
    }
  }
};
