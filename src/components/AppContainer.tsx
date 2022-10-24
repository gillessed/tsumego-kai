import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { NavigationView } from './Navigation/NavigationView';
import { ContentContainer } from './ContentContainer/ContentContainer';
import { SessionSelectors } from '../state/session/SessionReducer';
import { useSelector } from 'react-redux';
import { isAsyncLoaded } from '../state/utils/Async';
import { LoadingView } from './Loading/LoadingView';
import { AppRoutes } from './AppRoutes';
import { LoginView } from './Login/LoginView';

const HomeRedirect = () => <Redirect to='/tsumego-kai/app/home' />;

export const AppContainer = () => {
  const { user } = useSelector(SessionSelectors.state);

  if (!isAsyncLoaded(user)) {
    return <LoadingView type='app'/>;
  }

  const renderLogin = () => {
    if (user == null) {
      return <LoginView />;
    } else {
      return <Redirect to={AppRoutes.home()} />;
    }
  }

  const renderNavigationView = () => <NavigationView user={user.value} />
  const renderContentContainer = () => {
    const userValue = user.value;
    if (userValue != null) {
      return <ContentContainer user={userValue} />
    } else {
      return <Redirect to={AppRoutes.login()} />;
    }
  }

  return (
    <div className='app-root-container'>
      <Route path='/' exact render={HomeRedirect} />
      <Route path='/' render={renderNavigationView} />
      <Route path='/' render={renderContentContainer} />
      <Route path={AppRoutes.login()} render={renderLogin} />
    </div>
  );
};
