import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { isAsyncLoaded, isAsyncLoading } from "../../utils/Async";
import { AppRoutes } from "../AppRoutes";
import { LoadingView } from "../Loading/LoadingView";
import { AuthProps } from "./AuthProps";

export interface LoadUserProps {
  Authed: React.FunctionComponent<AuthProps>;
}

export const RequiredAuth = React.memo(({ Authed }: LoadUserProps) => {
  const user = useUser();
  if (isAsyncLoading(user)) {
    return <LoadingView type="app" />;
  } else if (isAsyncLoaded(user)) {
    if (user.value != null) {
      return <Authed user={user.value} />;
    } else {
      return <Navigate to={AppRoutes.login()} />;
    }
  }
});
