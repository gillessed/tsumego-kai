import * as React from 'react';
import { Route, Redirect } from 'react-router';
import Navigation from './Navigation/Navigation';
import { AppContainer } from './Container/Container';

export const App = () => (
    <div className='app-root-container'>
        <Route path='/' exact render={() => <Redirect to='/tsumego-kai/app/home' />} />
        <Route path='/' component={Navigation} />
        <Route path='/' component={AppContainer} />
    </div>
);
