import React from 'react';
import { Dropdown } from './Dropdown';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../AppRoutes';
import { Icon } from '@blueprintjs/core';
import './NavigationView.scss';
import { MaybeUser, User } from '../../state/session/User';
import firebase from 'firebase';
import { browserHistory } from '../../history';
import { IconNames } from '@blueprintjs/icons';

interface Props {
  user: MaybeUser;
}

export const NavigationView = React.memo(({
  user,
}: Props) => {

  const handleLogout = React.useCallback(() => {
    firebase.auth().signOut();
    browserHistory.push(AppRoutes.home());
  }, []);

  const renderActionsMenu = () => (
    <Dropdown icon='menu'>
      <div className='menu-item unselectable'>
        <Link to={AppRoutes.home()}>
          <Icon icon='home' />
          <div className='menu-item-sub'> Home </div>
        </Link>
      </div>
      <div className='menu-item unselectable'>
        <Link to={AppRoutes.collections()}>
          <Icon icon={IconNames.LIST_DETAIL_VIEW} />
          <div className='menu-item-sub'> Collections </div>
        </Link>
      </div>
      <div className='menu-item unselectable'>
        <Link to={AppRoutes.solve()}>
          <Icon icon='search' />
          <div className='menu-item-sub'> Solve </div>
        </Link>
      </div>
    </Dropdown>
  );

  const renderLoginButton = () => (
    <div className='menu-item nav-button'>
      <Link to={AppRoutes.login()}>
        Login
      </Link>
    </div>
  );

  const renderUserDropdown = (user: User) => (
    //TODO: fixme
    <Dropdown icon='user'>
      <div className='menu-item unselectable'>
        <Link to={AppRoutes.profile(user.uid)}>
          <Icon icon='mugshot' />
          <div className='menu-item-sub'> Profile </div>
        </Link>
      </div>
      <div className='menu-item unselectable'>
        <Link to={AppRoutes.settings()}>
          <Icon icon='cog' />
          <div className='menu-item-sub'> Settings </div>
        </Link>
      </div>
      <div className='menu-item unselectable'>
        <a onClick={handleLogout}>
          <Icon icon='log-out' />
          <div className='menu-item-sub'> Logout </div>
        </a>
      </div>
    </Dropdown>
  );

  return (
    <div className='navbar-container'>
      <nav className='main-navbar'>
        {renderActionsMenu()}
        {user == null && renderLoginButton()}
        {user != null && renderUserDropdown(user)}
      </nav>
    </div>
  );
});
