import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { isAsyncLoaded, isAsyncLoading } from '../../state/Async';
import { useAsyncAddProblem, useAsyncCollection } from '../../state/collections/CollectionsHooks';
import { User } from '../../state/session/User';
import { LoadingView } from '../Loading/LoadingView';
import './CollectionView.scss';
import { ProblemCard } from './ProblemCard';

interface Props {
  collectionId: string;
  user: User;
}

export const CollectionView = React.memo(({
  user,
  collectionId,
}: Props) => {
  const collection = useAsyncCollection(collectionId);

  const [handleNewProblem, addingNew] = useAsyncAddProblem(collectionId, user.uid);

  if (!isAsyncLoaded(collection) || isAsyncLoading(addingNew)) {
    return <LoadingView type='content' />;
  }

  const { problemIds, name } = collection.value;

  return (
    <div className='collection-view content-view effect-fade-in'>
      <div className='collection-title'>
        <h1>{name}</h1>
      </div>
      <div className='collection-problem-card-container'>
        {problemIds.map((problemId) => <ProblemCard key={problemId} collection={collection.value} problemId={problemId} />)}
        <div className='card add-problem-card' onClick={handleNewProblem}>
          <h2>New Tsumego</h2>
          <Icon icon={IconNames.ADD} iconSize={30} color='#03664d' />
        </div>
      </div>
    </div>
  );
});
