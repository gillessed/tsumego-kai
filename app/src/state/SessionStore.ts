import { observable, computed } from 'mobx';
import { TOKEN_HEADER } from '../api/config';
import { ApisauceWrapper } from '../api/network';
import { IToken, IUser } from '../api/api';
import { browserHistory } from '../history';
import { paths } from '../components/path';
import { setCookie } from '../utils/cookies';
import { SESSION_COOKIE } from '../index';
import { StoreContext } from './StoreContext';

export interface SessionData {
    token: string;
    userId: number;
    login: string;
    firstName: string;
    lastName: string;
    rank: number;
    roles: number[];
}

export class SessionStore {
    private readonly api: ApisauceWrapper;

    @observable public loggingIn: boolean;
    @observable public loginError?: string;
    @observable public user: SessionData;
    @observable public language: string;

    @computed public get hasSession(): boolean {
        return !!this.user;
    }

    @computed public get getDisplayName(): string {
        if (this.user) {
            return this.user.firstName + ' ' + this.user.lastName;
        } else {
            return '';
        }
    }

    public async login(username: string, password: string) {
        try {
            this.loggingIn = true;
            this.loginError = undefined;
            const loginResponse = await this.api.post('/auth/login', { username, password });
            const token = loginResponse.data as IToken;
            setCookie(SESSION_COOKIE, token.value);
            this.api.setHeader(TOKEN_HEADER, token.value);

            const userResponse = await this.api.get('/user');
            const userData = userResponse.data as IUser;
            
            const sessionData = {
                token: token.value,
                userId: userData.id,
                login: userData.login,
                firstName: userData.firstName,
                lastName: userData.lastName,
                rank: userData.rank,
                roles: userData.roles,
            };
            this.user = sessionData;
            this.loggingIn = false;
            this.loginError = undefined;
            browserHistory.push(paths.home());
        } catch (error) {
            this.loginError = error.message;
            this.loggingIn = false;
        }
    }

    constructor(context: StoreContext, language: string, sessionData?: SessionData) {
        this.api = context.api;
        this.language = language;
        if (sessionData) {
            this.user = sessionData;
        }
    }
}