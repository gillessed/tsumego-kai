import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppContainer } from "./components/AppContainer";
import { AppRoutes } from "./components/AppRoutes";
import { CollectionViewLoader } from "./components/Collection/CollectionViewLoader";
import { CollectionsView } from "./components/Collections/CollectionsView";
import { Home } from "./components/Home/Home";
import { LoginView } from "./components/Login/LoginView";
import { ProblemViewLoader } from "./components/Problem/ProblemViewLoader";
import { Profile } from "./components/Profile/Profile";
import { AuthProps } from "./components/RequiredAuth/AuthProps";
import { RequiredAuth } from "./components/RequiredAuth/RequiredAuth";
import { SolveLoader } from "./components/Solve/SolveLoader";
import { AppContextProvider, AppContextType } from "./context/AppContext";
import { registerDropdownListener } from "./dropdownListener";
import { Languages } from "./language/languages";
import "./main.css";

export const SESSION_COOKIE = "TSUMEGO_KAI_TOKEN";
export const LANGUAGE_COOKIE = "TSUMEGO_KAI_LANGUAGE";
export const DEFAULT_LANGUAGE = Languages.English;

const registerFirebase = async (): Promise<AppContextType> => {
  const firebaseConfig = {
    apiKey: "AIzaSyBllcg6JZQ3SzD0dGxcXkpMGwyM0kyE5QY",
    authDomain: "tsumego-kai.firebaseapp.com",
    databaseURL: "https://tsumego-kai.firebaseio.com",
    projectId: "tsumego-kai",
    storageBucket: "tsumego-kai.appspot.com",
    messagingSenderId: "436741291897",
    appId: "1:436741291897:web:451c1694867de342e2f9a8",
    measurementId: "G-3JFBMH90N7",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { app, auth, db };
};

const setup = async () => {
  const context = await registerFirebase();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppContainer />}>
        <Route path="/" element={<Home />} />
        <Route path={AppRoutes.home()} element={<Home />} />
        <Route path={AppRoutes.login()} element={<LoginView />} />
        <Route
          path={AppRoutes.collections()}
          element={<RequiredAuth Authed={CollectionsView} />}
        />
        <Route
          path={AppRoutes.collectionRoute}
          element={<RequiredAuth Authed={CollectionViewLoader} />}
        />
        <Route
          path={AppRoutes.problemRoute}
          element={
            <RequiredAuth
              Authed={({ user }: AuthProps) => {
                return <ProblemViewLoader user={user} editing={false} />;
              }}
            />
          }
        />
        <Route
          path={AppRoutes.problemEditRoute}
          element={
            <RequiredAuth
              Authed={({ user }: AuthProps) => {
                return <ProblemViewLoader user={user} editing={true} />;
              }}
            />
          }
        />
        <Route
          path={AppRoutes.profile()}
          element={<RequiredAuth Authed={Profile} />}
        />
        <Route
          path={AppRoutes.solve()}
          element={<RequiredAuth Authed={SolveLoader} />}
        />
      </Route>
    )
  );

  createRoot(document.getElementById("root")!).render(
    <AppContextProvider value={context}>
      <RouterProvider router={router} />
    </AppContextProvider>
  );

  return Promise.resolve();
};

registerDropdownListener();
setup();
