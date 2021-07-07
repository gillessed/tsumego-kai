import { combineReducers } from "redoodle";
import { ReduxState } from "./ReduxState";
import { InitialSessionState, sessionReducer } from "./session/SessionState";

export const InitialReduxState: ReduxState = {
  session: InitialSessionState,
}

export const rootReducer = combineReducers<ReduxState>({
  session: sessionReducer,
});
