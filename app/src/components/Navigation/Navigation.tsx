import * as React from 'react';
import { observer } from 'mobx-react';
import { Dropdown } from './Dropdown';
require('./Navigation.scss');

interface State {
    isOpen: boolean;
}

@observer
export default class Navigation extends React.Component<{}, State> {
    constructor(props: {}) {
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
                            Solve
                        </div>
                        <div className='menu-item unselectable'>
                            Create
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