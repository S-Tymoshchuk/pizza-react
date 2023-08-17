import * as React from 'react';
import { useSelector } from 'react-redux';

const Username = () => {
  const user = useSelector((state) => state.user.username);

  if (!user) return null;

  return <div className='text-sm font-semibold'>{user}</div>;
};

export default Username;
