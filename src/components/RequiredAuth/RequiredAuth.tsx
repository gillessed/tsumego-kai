import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { AppRoutes } from "../AppRoutes";
import { LoadingView } from "../Loading/LoadingView";
import { AuthProps } from "./AuthProps";

export interface LoadUserProps {
  Authed: React.FunctionComponent<AuthProps>;
}

export const RequiredAuth = React.memo(({ Authed }: LoadUserProps) => {
  const user = useUser();
  if (user.isFetching && !user.isRefetching) {
    return <LoadingView type="app" />;
  } else if (user.isFetched && user.data != null) {
    return <Authed user={user.data} />;
  } else {
    return <Navigate to={AppRoutes.login()} />;
  }
});
