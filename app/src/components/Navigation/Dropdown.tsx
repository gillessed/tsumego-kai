import * as React from 'react';
import classNames from 'classnames';
import { dropdownOpened } from '../../dropdownListener';
import { Icon, IconName } from '@blueprintjs/core';
require('./Dropdown.scss');

interface State {
    open?: boolean;
}

interface Props {
    icon?: IconName;
}

export class Dropdown extends React.Component<Props, State> {
    public closedFlag: boolean = false;
    public toggle: HTMLDivElement | undefined;

    constructor (props: Props) {
        super(props);

        this.state = {};
    }
    public render() {
        const toggleClasses = classNames({
            ['nav-dropdown-toggle']: true,
            ['unselectable']: true,
            ['open']: this.state.open,
            ['closed']: this.state.open === false,
            ['loaded']: this.state.open === undefined,
        });
        const listClasses = classNames({
            ['dropdown-list']: true,
            ['open']: this.state.open,
            ['closed']: this.state.open === false,
            ['loaded']: this.state.open === undefined,
        });
        return (
            <div className='kai-dropdown'>
                <div ref={this.setRef} className={toggleClasses} onClick={this.open}>
                    {this.props.icon && <Icon icon={this.props.icon} iconSize={32}/>}
                    <Icon icon={this.state.open ? 'caret-up' : 'caret-down'} iconSize={20}/>
                </div>
                <div className={listClasses}>
                    {React.Children.map(this.props.children, (child) => child)}
                </div>
            </div>
        );
    }

    private setRef = (ref: HTMLDivElement | null) => {
        if (ref) {
            this.toggle = ref;
        }
    }

    public open = () => {
        if (this.closedFlag) {
            this.closedFlag = false;
        } else if (!this.state.open) {
            dropdownOpened(this);
            this.setState({ open: true });
        }
    }

    public close = () => {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }
}