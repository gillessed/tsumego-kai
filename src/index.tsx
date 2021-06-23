import 'babel-polyfill';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { App } from './components/App';
import { registerGlobaListener } from './dropdownListener';
import { browserHistory } from './history';
import './index.scss';
import { Languages } from './language/languages';
import { SessionData } from './state/SessionStore';
import { getCookie } from './utils/cookies';
import { Provider } from 'react-redux';

export const SESSION_COOKIE = 'TSUMEGO_KAI_TOKEN';
export const LANGUAGE_COOKIE = 'TSUMEGO_KAI_LANGUAGE';
export const DEFAULT_LANGUAGE = Languages.English;

async function setup() {
    const existingToken = getCookie(SESSION_COOKIE);
    const language = getCookie(LANGUAGE_COOKIE, DEFAULT_LANGUAGE) || DEFAULT_LANGUAGE;
    let sessionData: SessionData | undefined;

    // if (existingToken) {
    //     api.setHeader(TOKEN_HEADER, existingToken);
    //     try {
    //         const response = await api.get('/user');
    //         if (response.ok && response.data) {
    //             const user = response.data as IUser;
    //             sessionData = {
    //                 token: existingToken,
    //                 userId: user.id,
    //                 login: user.login,
    //                 firstName: user.firstName,
    //                 lastName: user.lastName,
    //                 rank: user.rank,
    //                 roles: user.roles,
    //             };
    //         }
    //     } catch (error) {
    //         deleteCookie(SESSION_COOKIE);
    //     }
    // }

    ReactDOM.render((
        <Provider store={null as any}>
            <Router history={browserHistory}>
                <App/>
            </Router>
        </Provider>
    ), document.getElementById('main'));
    
    return Promise.resolve();
}

registerGlobaListener();
setup();
