import { combineReducers } from "redoodle";
import { ReduxState } from "./ReduxState";
import { InitialSessionState, sessionReducer } from "./session/SessionReducer";
import { solveReducer } from "./solve/SolveReducers";

export const InitialReduxState: ReduxState = {
  session: InitialSessionState,
  solve: null,
}

export const rootReducer = combineReducers<ReduxState>({
  session: sessionReducer,
  solve: solveReducer,
});
