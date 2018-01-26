// @flow
export type User = {
  uid: string,
  userName: string,
};

export type Photo = {
  photoID: string,
  uid: string,
  userName: string,
  star: number,
  thumbURL: string,
  createdAt: string,
  likes: number,
};

export type PhotoDetail = {
  photoID: string,
  imageURL: string,
  uid: string,
  userName: string,
  createdAt: string,
  star: number,
  likeUsers: User[],
};
