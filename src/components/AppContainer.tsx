import { Outlet } from 'react-router-dom';
import { useUser } from "../hooks/useUser";
import { LoadingView } from './Loading/LoadingView';
import { NavigationView } from './Navigation/NavigationView';

export const AppContainer = () => {
  const user = useUser();

  function renderOutlet() {
    if (user.isLoading) {
      return <LoadingView type='app'/>;
    } else {
      return <Outlet />;
    }
  }

  return (
    <div className='app-root-container'>
      <NavigationView />
      {renderOutlet()}
    </div>
  );
};
