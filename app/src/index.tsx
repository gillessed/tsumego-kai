import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { RootStore, StoreContext } from './state/RootStore';
import { Languages } from './language/languages';
import { getCookie } from './utils/cookies';
import { apiPath, TOKEN_HEADER } from './api/config';
import { SessionData } from './state/session/SessionStore';
import { User } from './api/User';
import { App } from './components/App';
require('./index.scss');

export const SESSION_COOKIE = 'TSUMEGO_KAI_TOKEN';
export const LANGUAGE_COOKIE = 'TSUMEGO_KAI_LANGUAGE';
export const DEFAULT_LANGUAGE = Languages.English;

async function setup() {
    const existingToken = getCookie(SESSION_COOKIE);
    const language = getCookie(LANGUAGE_COOKIE, DEFAULT_LANGUAGE) || DEFAULT_LANGUAGE;
    let sessionData: SessionData | undefined;

    if (existingToken) {
        try {
            const response = await fetch(apiPath('/user'), {
                method: 'GET',
                headers: {
                    [TOKEN_HEADER]: existingToken,
                },
            });
            const json = await response.json();
            if (!json.error) {
                const user: User = json;
                sessionData = {
                    token: existingToken,
                    userId: user.id,
                    login: user.login,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    rank: user.rank,
                };
            }
        } catch (error) {
            console.log('Error verifying server token.', error);
        }
    }

    const context: StoreContext = {
        sessionData,
        language,
    };
    const rootStore = new RootStore(context);

    ReactDOM.render((
        <Provider rootStore={rootStore}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    ), document.getElementById('main'));
    
    return Promise.resolve();
}

setup();