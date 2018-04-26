import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { paths } from '../path';
import { Home } from '../Home/Home';
import { Create } from '../Create/Create';
import { Login } from '../Login/Login';
import { observer, inject } from 'mobx-react';
import { RootStore } from '../../state/RootStore';
import { Signup } from '../Signup/Signup';
require('./Container.scss');

interface Props {
    rootStore: RootStore;
}

@inject('rootStore')
@observer
export class AppContainer extends React.Component<Props, {}> {
    public render() {
        return (
            <div className='app-container'>
                <Route path={paths.home()} component={Home} />
                <Route path={paths.create()} component={Create} />
                <Route path={paths.login()} render={this.renderLogin} />
                <Route path={paths.signup()} component={Signup} />
            </div>
        );
    }

    private renderLogin = () => {
        if (this.props.rootStore.sessionStore.hasSession) {
            return <Redirect to={paths.home()} />;
        } else {
            return <Login />;
        }
    }
}