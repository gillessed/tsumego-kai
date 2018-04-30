import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { Languages } from './language/languages';
import { getCookie, deleteCookie } from './utils/cookies';
import { TOKEN_HEADER, apiPath } from './api/config';
import { SessionData, SessionStore } from './state/SessionStore';
import { IUser } from './api/api';
import { App } from './components/App';
import { registerGlobaListener } from './dropdownListener';
import { create } from 'apisauce';
import { ApisauceWrapper } from './api/network';
import { browserHistory } from './history';
import { StoreContext } from './state/StoreContext';
require('./index.scss');

export const SESSION_COOKIE = 'TSUMEGO_KAI_TOKEN';
export const LANGUAGE_COOKIE = 'TSUMEGO_KAI_LANGUAGE';
export const DEFAULT_LANGUAGE = Languages.English;

async function setup() {
    const existingToken = getCookie(SESSION_COOKIE);
    const language = getCookie(LANGUAGE_COOKIE, DEFAULT_LANGUAGE) || DEFAULT_LANGUAGE;
    let sessionData: SessionData | undefined;

    const api = new ApisauceWrapper(create({
        baseURL: apiPath(''),
    }));

    if (existingToken) {
        api.setHeader(TOKEN_HEADER, existingToken);
        try {
            const response = await api.get('/user');
            if (response.ok && response.data) {
                const user = response.data as IUser;
                sessionData = {
                    token: existingToken,
                    userId: user.id,
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    rank: user.rank,
                    roles: user.roles,
                };
            }
        } catch (error) {
            deleteCookie(SESSION_COOKIE);
        }
    }

    const context: StoreContext = {
        api,
    };
    const sessionStore = new SessionStore(context, language, sessionData);

    ReactDOM.render((
        <Provider sessionStore={sessionStore}>
            <Router history={browserHistory}>
                <App/>
            </Router>
        </Provider>
    ), document.getElementById('main'));
    
    return Promise.resolve();
}

registerGlobaListener();
setup();