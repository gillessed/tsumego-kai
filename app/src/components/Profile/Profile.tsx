import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { SessionStore } from '../../state/SessionStore';
import { MatchProps } from '../Navigation/MatchProps';
require('./Profile.scss');

interface Props extends MatchProps {
    sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
export class Profile extends React.Component<Props, {}> {
    public render() {
        return (
            <div className='profile-container'>
                {JSON.stringify(this.props.match.params, null, 2)}
            </div>
        );
    }
}
