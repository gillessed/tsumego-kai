import { FirebaseApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import React from "react";

export interface AppContextType {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
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