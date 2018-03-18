import * as React from 'react';
import { Route } from 'react-router';
import Navigation from './Navigation/Navigation';
import { AppContainer } from './Container/Container';

export const App = () => (
    <div>
        <Route path='/' component={Navigation} />
        <Route path='/' component={AppContainer} />
    </div>
);
