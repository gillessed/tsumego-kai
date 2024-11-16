import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Database } from "firebase/database";
import React from "react";

export interface AppContextType {
  app: FirebaseApp;
  auth: Auth;
  database: Database;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppContext = React.createContext<AppContextType>(undefined as any);

export const useAppContext = () => {
  const value = React.useContext(AppContext);
  if (value == null) {
    throw Error("App context must be set");
  }
  return value;
}

export const AppContextProvider = AppContext.Provider;