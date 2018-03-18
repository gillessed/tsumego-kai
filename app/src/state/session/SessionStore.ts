import { observable, computed } from 'mobx';
import { StoreContext } from '../RootStore';

export interface SessionData {
    token: string;
    userId: number;
    login: string;
    firstName: string;
    lastName: string;
    rank: number;
}

export class SessionStore {
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

    constructor(context: StoreContext) {
        if (context.sessionData) {
            this.user = context.sessionData;
            this.language = context.language;
        }
    }
}