import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Dropdown } from './Dropdown';
import { Link } from 'react-router-dom';
import { paths } from '../path';
import { SessionStore } from '../../state/SessionStore';
import { Icon } from '@blueprintjs/core';
require('./Navigation.scss');

interface Props {
  sessionStore: SessionStore;
}

interface State {
  isOpen: boolean;
}

export default class Navigation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public render() {
    const hasSession = this.props.sessionStore.hasSession;
    return (
      <div className='navbar-container'>
        <nav className='main-navbar'>
          {this.renderActionsMenu()}
          {!hasSession && this.renderLoginButton()}
          {hasSession && this.renderUserDropdown()}
        </nav>
      </div>
    );
  }

  private renderActionsMenu() {
    return (
      <Dropdown icon='menu'>
        <div className='menu-item unselectable'>
          <Link to={paths.home()}>
            <Icon icon='home' />
            <div className='menu-item-sub'> Home </div>
          </Link>
        </div>
        <div className='menu-item unselectable'>
          <Link to={paths.solve()}>
            <Icon icon='search' />
            <div className='menu-item-sub'> Solve </div>
          </Link>
        </div>
        <div className='menu-item unselectable'>
          <Link to={paths.create()}>
            <Icon icon='new-object' />
            <div className='menu-item-sub'> Compose </div>
          </Link>
        </div>
      </Dropdown>
    );
  }

  private renderLoginButton() {
    return (
      <div className='menu-item nav-button'>
        <Link to={paths.login()}>
          Login
        </Link>
      </div>
    )
  }

  private renderUserDropdown() {
    const { user } = this.props.sessionStore;
    return (
      <Dropdown icon='user'>
        <div className='menu-item unselectable'>
          <Link to={paths.profile(user.userId)}>
            <Icon icon='mugshot' />
            <div className='menu-item-sub'> Profile </div>
          </Link>
        </div>
        <div className='menu-item unselectable'>
          <Link to={paths.settings()}>
            <Icon icon='cog' />
            <div className='menu-item-sub'> Settings </div>
          </Link>
        </div>
        <div className='menu-item unselectable'>
          <a onClick={this.onClickLogout}>
            <Icon icon='log-out' />
            <div className='menu-item-sub'> Logout </div>
          </a>
        </div>
      </Dropdown>
    );
  }

  private onClickLogout = () => {
  }
}
