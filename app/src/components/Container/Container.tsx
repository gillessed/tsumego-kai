import * as React from 'react';
import { Route } from 'react-router';
import { paths } from '../path';
import { Home } from '../Home/Home';
require('./Container.scss');

export class AppContainer extends React.PureComponent<{}, {}> {
    public render() {
        return (
            <div className='app-container'>
                <div className='app-sub-container'>
                    <Route path={paths.home()} component={Home} />
                </div>
            </div>
        );
    }
}