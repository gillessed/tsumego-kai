import * as React from 'react';
require('./Dropdown.scss');

interface State {
    open: boolean;
}

interface Props {
    toggle: string;
}

export class Dropdown extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);
        this.state = {
            open: true,
        };
    }
    public render() {
        return (
            <div className='kai-dropdown'>
                <div className='nav-dropdown-toggle' onPress={this.toggle}>
                    {this.props.toggle}
                    <i className='fas fa-caret-down' />
                </div>
                <div className='dropdown-list'>
                    {React.Children.map(this.props.children, (child) => child)}
                </div>
            </div>
        );
    }

    private toggle = () => {
        this.setState({ open: !this.state.open });
    }
}