import React, { useEffect, useState } from 'react';
import { Async, asyncEmpty, isAsyncLoaded, isAsyncLoading, loadAsyncEffect } from '../../state/Async';
import { Collections } from '../../state/collections/CollectionsHandlers';
import { Collection, emptyProblem } from '../../state/collections/CollectionsTypes';
import { User } from '../../state/session/User';
import { LoadingView } from '../Loading/LoadingView';
import { ProblemCard } from './ProblemCard';
import './CollectionView.scss';
import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useCallback } from 'react';
import { browserHistory } from '../../history';
import { AppRoutes } from '../AppRoutes';

interface Props {
  collectionId: string;
  user: User;
}

export const CollectionView = React.memo(({
  user,
  collectionId,
}: Props) => {
  const [collection, setCollection] = useState<Async<Collection>>(asyncEmpty);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadAsyncEffect(setCollection, () => Collections.getCollectionById(collectionId), true), [collectionId]);

  const [addingNew, setAddingNew] = useState<Async<void>>(asyncEmpty);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNewTsumego = useCallback(loadAsyncEffect(setAddingNew, async () => {
    const problemId = await Collections.addNewProblem(emptyProblem(user.uid, collectionId));
    if (problemId != null) {
      browserHistory.push(AppRoutes.problem(problemId));
    }
  }), [user]);

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
        <div className='card add-problem-card' onClick={handleNewTsumego}>
          <h2>New Tsumego</h2>
          <Icon icon={IconNames.ADD} iconSize={30} color='#03664d' />
        </div>
        {problemIds.map((problemId) => <ProblemCard key={problemId} problemId={problemId} />)}
      </div>
    </div>
  );
});
