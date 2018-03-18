import { SessionStore, SessionData } from './session/SessionStore';

export interface StoreContext {
    sessionData?: SessionData;
    language: string;
}

export class RootStore {
    public sessionStore: SessionStore;

    public constructor(context: StoreContext) {
        this.sessionStore = new SessionStore(context);
    }
}