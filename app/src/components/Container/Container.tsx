import * as React from 'react';
import { Route } from 'react-router';
import { paths } from '../path';
import { Home } from '../Home/Home';
import { Create } from '../Create/Create';
require('./Container.scss');

export class AppContainer extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className='app-container'>
                <Route path={paths.home()} component={Home} />
                <Route path={paths.create()} component={Create} />
            </div>
        );
    }
}