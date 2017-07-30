// @flow
import React from 'react';

import iconHome from 'material-ui/svg-icons/action/home';
import iconPhotoCamera from 'material-ui/svg-icons/image/photo-camera';
import iconThumbUp from 'material-ui/svg-icons/action/thumb-up';
import iconAccountBox from 'material-ui/svg-icons/action/account-box';
import iconAccountCircle from 'material-ui/svg-icons/action/account-circle';
import iconAddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import iconDelete from 'material-ui/svg-icons/action/delete';
import iconFileUpload from 'material-ui/svg-icons/file/file-upload';
import FontIcon from 'material-ui/FontIcon';

export const IconHome = iconHome;
export const IconPhotoCamera = iconPhotoCamera;
export const IconThumbUp = iconThumbUp;
export const IconAccountBox = iconAccountBox;
export const IconAccountCircle = iconAccountCircle;
export const IconAddPhoto = iconAddPhoto;
export const IconDelete = iconDelete;
export const IconFileUpload = iconFileUpload;
export const IconSignIn = (props: any) =>
  <FontIcon {...props} className="fa fa-sign-in" />;
export const IconSignOut = (props: any) =>
  <FontIcon {...props} className="fa fa-sign-out" />;
export const IconGoogle = (props: any) =>
  <FontIcon {...props} className="fa fa-google" />;
export const IconTwitter = (props: any) =>
  <FontIcon {...props} className="fa fa-twitter" />;
