import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { paths } from '../path';
import { Home } from '../Home/Home';
import { Create } from '../Create/Create';
import { Login } from '../Login/Login';
import { observer, inject } from 'mobx-react';
import { SessionStore } from '../../state/SessionStore';
import { Signup } from '../Signup/Signup';
import { Profile } from '../Profile/Profile';
require('./Container.scss');

interface Props {
    sessionStore: SessionStore;
}

@inject('sessionStore')
@observer
export class AppContainer extends React.Component<Props, {}> {
    public render() {
        return (
            <div className='app-container'>
                <Route path={paths.home()} component={Home} />
                <Route path={paths.create()} component={Create} />
                <Route path={paths.login()} render={this.renderLogin} />
                <Route path={paths.signup()} component={Signup} />
                <Route path={paths.profileRoute()} component={Profile} />
            </div>
        );
    }

    private renderLogin = () => {
        if (this.props.sessionStore.hasSession) {
            return <Redirect to={paths.home()} />;
        } else {
            return <Login />;
        }
    }
}