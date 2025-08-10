import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { getAuth } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useUser } from '../../hooks/useUser';
import { AppRoutes } from '../AppRoutes';
import { Dropdown } from './Dropdown';
import './NavigationView.css';
import { isAsyncLoaded } from '../../utils/Async';

export const NavigationView = React.memo(() => {
  const { app } = useAppContext();
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = React.useCallback(() => {
    getAuth(app).signOut();
    navigate(AppRoutes.home());
  }, [app, navigate]);

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

  const renderUserDropdown = () => (
    <Dropdown icon='user'>
      <div className='menu-item unselectable'>
        <Link to={AppRoutes.profile()}>
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
        {isAsyncLoaded(user) && user.value == null && renderLoginButton()}
        {isAsyncLoaded(user) && user.value != null && renderUserDropdown()}
      </nav>
    </div>
  );
});
