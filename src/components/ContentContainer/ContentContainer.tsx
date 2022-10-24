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
  const renderCollectionsView = () => {
    return <CollectionsView user={user} />;
  }
  const renderCollectionView = (props: RouteComponentProps<{ id?: string }>) => {
    return <CollectionView user={user} collectionId={props.match.params.id ?? ''} />;
  }
  const renderProblemView = (props: RouteComponentProps<{ id?: string }>) => {
    return <ProblemView problemId={props.match.params.id ?? ''} editing={false} />;
  }
  const renderProblemEditView = (props: RouteComponentProps<{ id?: string }>) => {
    return <ProblemView problemId={props.match.params.id ?? ''} editing={true} />;
  }

  return (
    <div className='app-container'>
      <Route path={AppRoutes.home()} component={Home} />
      <Route path={AppRoutes.collectionRoute} render={renderCollectionView} />
      <Route path={AppRoutes.collections()} render={renderCollectionsView} />
      <Route path={AppRoutes.problemRoute} render={renderProblemView} />
      <Route path={AppRoutes.problemEditRoute} render={renderProblemEditView} />
      <Route path={AppRoutes.signup()} component={Signup} />
      <Route path={AppRoutes.profileRoute()} component={Profile} />
    </div>
  );
};
