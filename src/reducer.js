// @flow
import { singleton as firebase } from './infrastructure/FirebaseUtils';
import type { Photo, PhotoDetail, User } from './types';

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
const SET_SUBMIT = 'SET_SUBMIT';
const SET_NAME_DIALOG_OPEN = 'SET_NAME_DIALOG_OPEN';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_A_PHOTO = 'SET_A_PHOTO';
const SET_PHOTOS = 'SET_PHOTOS';
const SET_LOADING = 'SET_LOADING';
const SET_LIKES = 'SET_LIKES';
const ADD_LIKE = 'ADD_LIKE';
const REMOVE_LIKE = 'REMOVE_LIKE';
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
  uid: ?string,
  userName: ?string,
  nameDialogOpen: boolean,
  photos: Photo[],
  photo: PhotoDetail,
  submit: {
    imageURL: ?string,
    createdAt: ?string,
  },
  notification: {
    message: string,
    timestamp: number,
  },
  likes: string[],
};

const initialState: State = {
  logged: false,
  loading: true,
  drawerOpened: false,
  uid: null,
  userName: null,
  nameDialogOpen: false,
  photos: [],
  photo: {
    photoID: '',
    imageURL: '',
    uid: '',
    userName: '',
    createdAt: '',
    star: 0,
    likeUsers: [],
  },
  submit: {
    imageURL: null,
    createdAt: null,
  },
  notification: {
    message: '',
    timestamp: 0,
  },
  likes: [],
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

export function setOnSignInHandler() {
  return (dispatch: Dispatch) => {
    firebase.setOnSignInHandler((uid, userName) => {
      (async () => {
        const likes = await firebase.getLikes();
        dispatch({
          type: SIGN_IN,
          payload: {
            uid,
            userName,
            likes,
          },
        });
      })();
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

export function setOnSignOutHandler() {
  return (dispatch: Dispatch, getState: () => State) => {
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
      const result: Blob = xhr.response;
      const uploadPromise = firebase.uploadImage(result, star);
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
      dispatch(refreshPhotos());
    };
    xhr.responseType = 'blob';
    xhr.open('GET', submit.imageURL);
    xhr.send();
  };
}

export function setSubmit(imageURL: string, createdAt: string): Action {
  return {
    type: SET_SUBMIT,
    payload: {
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

export function refreshPhotos() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        loading: true,
      },
    });
    (async () => {
      const photosPromise = firebase.getPhotos();
      const likesPromise = firebase.getLikes();
      dispatch({
        type: SET_PHOTOS,
        payload: {
          photos: await photosPromise,
        },
      });
      dispatch({
        type: SET_LIKES,
        payload: {
          likes: await likesPromise,
        },
      });
    })();
  };
}

export function refreshPhoto(photoID: string) {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: SET_LOADING,
      payload: {
        loading: true,
      },
    });
    const photoPromise = firebase.getPhoto(photoID);
    const likesPromise = firebase.getLikes();
    dispatch({
      type: SET_A_PHOTO,
      payload: {
        photo: await photoPromise,
      },
    });
    dispatch({
      type: SET_LIKES,
      payload: {
        likes: await likesPromise,
      },
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

export function toggleLike(photoID: string) {
  return (dispatch: Dispatch, getState: () => State) => {
    const state = getState();
    if (!state.logged) {
      return;
    }
    const likes = state.likes;
    if (!likes.includes(photoID)) {
      firebase.addLike(photoID);
      dispatch({
        type: ADD_LIKE,
        payload: {
          photoID,
        },
      });
    } else {
      firebase.removeLike(photoID);
      dispatch({
        type: REMOVE_LIKE,
        payload: {
          photoID,
        },
      });
    }
  };
}

function updatePhotosLikes(
  photos: Photo[],
  photoID: string,
  diff: number
): Photo[] {
  return photos.map(photo => {
    if (photo.photoID !== photoID) {
      return photo;
    }
    return { ...photo, likes: photo.likes + diff };
  });
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        logged: true,
        uid: payload.uid,
        userName: payload.userName,
        likes: payload.likes,
      };
    case SIGN_OUT:
      return {
        ...state,
        logged: false,
        uid: null,
        userName: null,
        likes: [],
      };
    case SET_LIKES:
      return {
        ...state,
        likes: payload.likes,
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
    case SET_A_PHOTO:
      return {
        ...state,
        loading: false,
        photo: payload.photo,
      };
    case ADD_LIKE: {
      const photos = updatePhotosLikes(state.photos, payload.photoID, 1);
      if (
        state.photo.photoID === payload.photoID &&
        state.uid &&
        state.userName
      ) {
        const user: User = { uid: state.uid, userName: state.userName };
        return {
          ...state,
          photo: {
            ...state.photo,
            likeUsers: [user, ...state.photo.likeUsers],
          },
          photos,
          likes: [payload.photoID, ...state.likes],
        };
      } else {
        return {
          ...state,
          photos,
          likes: [payload.photoID, ...state.likes],
        };
      }
    }
    case REMOVE_LIKE: {
      const photos = updatePhotosLikes(state.photos, payload.photoID, -1);
      if (state.photo.photoID === payload.photoID) {
        return {
          ...state,
          photo: {
            ...state.photo,
            likeUsers: state.photo.likeUsers.filter(
              user => user.uid !== state.uid
            ),
          },
          photos,
          likes: state.likes.filter(photoID => photoID !== payload.photoID),
        };
      } else {
        return {
          ...state,
          photos,
          likes: state.likes.filter(photoID => photoID !== payload.photoID),
        };
      }
    }
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
