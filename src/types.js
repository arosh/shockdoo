// @flow
export type Photo = {
  seq: number,
  uid: string,
  userName: string,
  star: number,
  imageURL: string,
  thumbURL: string,
  createdAt: string,
  likes: number,
};

export type PhotoDetail = {
  imageURL: string,
  uid: string,
  userName: string,
  createdAt: string,
  star: number,
  likeMark: boolean,
  likeUsers: string[],
};
