import * as React from 'react';
import { Route } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { User } from '../../state/session/User';
import { AppRoutes } from '../AppRoutes';
import { CollectionsView } from '../Collections/CollectionsView';
import { CollectionView } from '../Collections/CollectionView';
import { Home } from '../Home/Home';
import { Profile } from '../Profile/Profile';
import { Signup } from '../Signup/Signup';
import './ContentContainer.scss';
import { ProblemView } from '../Problem/ProblemView';

interface Props {
  user: User;
}

export const ContentContainer = ({ user }: Props) => {
  const renderCollectionsView = () => <CollectionsView user={user} />;
  const renderCollectionView = (props: RouteComponentProps<{ id?: string }>) => <CollectionView user={user} collectionId={props.match.params.id ?? ''} />;
  const renderProblemView = (props: RouteComponentProps<{ id?: string }>) => <ProblemView problemId={props.match.params.id ?? ''} />;

  return (
    <div className='app-container'>
      <Route path={AppRoutes.home()} component={Home} />
      <Route path={AppRoutes.collectionRoute()} render={renderCollectionView} />
      <Route path={AppRoutes.collections()} render={renderCollectionsView} />
      <Route path={AppRoutes.problemRoute()} render={renderProblemView} />
      <Route path={AppRoutes.signup()} component={Signup} />
      <Route path={AppRoutes.profileRoute()} component={Profile} />
    </div>
  );
};
