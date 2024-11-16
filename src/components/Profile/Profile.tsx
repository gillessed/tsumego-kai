import React from 'react';
import './Profile.css';
import { AuthProps } from '../RequiredAuth/AuthProps';

export const Profile = React.memo(({ user }: AuthProps) => {
  return (
    <div className='profile-container'>
      {user.displayName}
    </div>
  );
});
