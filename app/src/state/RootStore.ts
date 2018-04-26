import { SessionStore, SessionData } from './session/SessionStore';
import { ApisauceWrapper } from '../api/network';

export interface RootStoreProps {
    rootStore: RootStore;
}

export interface StoreContext {
    api: ApisauceWrapper;
    sessionData?: SessionData;
    language: string;
}

export class RootStore {
    public sessionStore: SessionStore;

    public constructor(context: StoreContext) {
        this.sessionStore = new SessionStore(context);
    }
}