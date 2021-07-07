import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'
import React from 'react';
import { AppRoutes } from '../AppRoutes';
import './LoginView.scss';

const UiContainerId = 'firebaseui-auth-container';

export const LoginView = React.memo(() => {
  const setUiContainerRef = React.useCallback(() => {
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(`#${UiContainerId}`, {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: AppRoutes.home(),
    });
  }, []);

  return (
    <div id={UiContainerId} ref={setUiContainerRef} />
  );
})
