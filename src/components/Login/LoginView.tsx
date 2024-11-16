import { Auth, EmailAuthProvider } from "firebase/auth";
import { auth as authUi } from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import React from "react";
import { useAppContext } from "../../context/AppContext";
import { AppRoutes } from "../AppRoutes";
import "./LoginView.css";

const UiContainerId = "firebaseui-auth-container";

let _ui: authUi.AuthUI;

function getUi(auth: Auth) {
  if (_ui == null) {
    _ui = new authUi.AuthUI(auth);
  }
  return _ui;
}

export const LoginView = React.memo(() => {
  const { auth } = useAppContext();
  const setUiContainerRef = React.useCallback(() => {
    const ui = getUi(auth);
    ui.start(`#${UiContainerId}`, {
      signInOptions: [EmailAuthProvider.PROVIDER_ID],
      signInSuccessUrl: AppRoutes.home(),
    });
  }, [auth]);

  return <div id={UiContainerId} ref={setUiContainerRef} />;
});
