// @flow
import React from 'react';

type PropsType = {
  userName: string,
};

export default function Profile(props: PropsType) {
  const {userName} = props;
  return (
    <div>{userName}</div>
  );
}
