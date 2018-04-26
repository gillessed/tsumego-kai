import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Dropdown } from './Dropdown';
import { RootStore } from '../../state/RootStore';
import { Link } from 'react-router-dom';
import { paths } from '../path';
require('./Navigation.scss');

interface Props {
    rootStore: RootStore;
}

interface State {
    isOpen: boolean;
}

@inject('rootStore')
@observer
export default class Navigation extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    public render() {
        const hasSession = this.props.rootStore.sessionStore.hasSession;
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
            <Dropdown toggle='Actions'>
                <div className='menu-item unselectable'>
                    <Link to={paths.solve()}>
                        <div className='menu-item-sub'> Solve </div>
                    </Link>
                </div>
                <div className='menu-item unselectable'>
                    <Link to={paths.create()}>
                        <div className='menu-item-sub'> Create </div>
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
        const { user } = this.props.rootStore.sessionStore;
        return (
            <Dropdown toggle={user.login}>
                <div className='menu-item unselectable'>
                    <Link to={paths.user(user.userId)}>
                        <div className='menu-item-sub'> Profile </div>
                    </Link>
                </div>
                <div className='menu-item unselectable'>
                    <Link to={paths.settings()}>
                        <div className='menu-item-sub'> Settings </div>
                    </Link>
                </div>
                <div className='menu-item unselectable'>
                    <a onClick={this.onClickLogout}>
                        <div className='menu-item-sub'> Logout </div>
                    </a>
                </div>
            </Dropdown>
        );
    }
    
    private onClickLogout = () => {
    }
}
