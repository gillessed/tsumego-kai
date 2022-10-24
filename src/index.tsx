import firebase from "firebase/app";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router } from 'react-router-dom';
import { createStore, Store } from "redoodle";
import { AppContainer } from './components/AppContainer';
import { registerDropdownListener } from './dropdownListener';
import { browserHistory } from './history';
import './index.scss';
import { Languages } from './language/languages';
import { ReduxState } from "./state/ReduxState";
import { InitialReduxState, rootReducer } from "./state/RootReducer";
import { SessionActions } from "./state/session/SessionReducer";

export const SESSION_COOKIE = 'TSUMEGO_KAI_TOKEN';
export const LANGUAGE_COOKIE = 'TSUMEGO_KAI_LANGUAGE';
export const DEFAULT_LANGUAGE = Languages.English;

const registerFirebase = async (store: Store<ReduxState>) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBllcg6JZQ3SzD0dGxcXkpMGwyM0kyE5QY",
    authDomain: "tsumego-kai.firebaseapp.com",
    databaseURL: "https://tsumego-kai.firebaseio.com",
    projectId: "tsumego-kai",
    storageBucket: "tsumego-kai.appspot.com",
    messagingSenderId: "436741291897",
    appId: "1:436741291897:web:451c1694867de342e2f9a8",
    measurementId: "G-3JFBMH90N7"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user) => {
    store.dispatch(SessionActions.setUser(user ?? null));
  });
}

const setup = async () => {

  const store = createStore(rootReducer, InitialReduxState);
  await registerFirebase(store);

  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <AppContainer />
      </Router>
    </Provider>
  ), document.getElementById('root'));

  return Promise.resolve();
}

registerDropdownListener();
setup();
