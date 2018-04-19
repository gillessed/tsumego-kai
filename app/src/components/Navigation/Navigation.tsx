import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Dropdown } from './Dropdown';
import { RootStore } from '../../state/RootStore';
import { Link } from 'react-router-dom';
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
        return (
            <div className='navbar-container'>
                <nav className='main-navbar'>
                    <Dropdown toggle='Actions'>
                        <div className='menu-item unselectable'>
                            <Link to='/tsumego-kai/app/solve'> Solve</Link>
                        </div>
                        <div className='menu-item unselectable'>
                            <Link to='/tsumego-kai/app/create'> Create</Link>
                        </div>
                    </Dropdown>
                    <Dropdown toggle='gillessed 2D'>
                        <div className='menu-item unselectable'>
                            My Records
                        </div>
                        <div className='menu-item unselectable'>
                            Settings
                        </div>
                        <div className='menu-item unselectable'>
                            Logout
                        </div>
                    </Dropdown>
                </nav>
            </div>
        );
    }
}