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
                        <div className='menu-item'>
                            Solve
                        </div>
                        <div className='menu-item'>
                            Create
                        </div>
                    </Dropdown>
                    {/* <Container>
                        <Link className='navbar-brand' to={paths.home()}> Tsumego Kai </Link>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <Link className='nav-link' to={paths.create()}>Create</Link>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        gillessed 2D
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem>
                                            Profile
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            My Collections
                                        </DropdownItem>
                                        <DropdownItem>
                                            My Games
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Container> */}
                </nav>
            </div>
        );
    }
}