import { defineAction, TypedReducer } from 'redoodle';
import { actionName } from '../utils/ActionName';
import { Async, asyncEmpty, asyncLoaded } from '../utils/Async';
import { ReduxState } from '../ReduxState';
import { MaybeUser } from './User';

export interface SessionState {
  user: Async<MaybeUser>;
}

export const InitialSessionState = {
  user: asyncEmpty,
}

const name = actionName('session');
const setUser = defineAction(name('setUser'))<MaybeUser>();
export const SessionActions = {
  setUser,
};

const setUserReducer = (state: SessionState, user: MaybeUser): SessionState => {
  return { ...state, user: asyncLoaded(user) };
}

export const sessionReducer = TypedReducer.builder<SessionState>()
  .withDefinitionHandler(setUser, setUserReducer)
  .build();

const state = (state: ReduxState) => state.session;

export const SessionSelectors = {
  state
}
