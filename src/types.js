// @flow
export type Photo = {
  id: number,
  userID: string,
  userName: string,
  star: number,
  imageURL: string,
  thumbURL: string,
  createdAt: string,
  likes: number,
};

export type PhotoDetail = {
  imageURL: string,
  userID: string,
  userName: string,
  createdAt: string,
  star: number,
  likeMark: boolean,
  likeUsers: string[],
};
