import React from 'react';
import { useAsyncAddProblem, useAsyncCollection } from '../../state/collections/CollectionsHooks';
import { User } from '../../state/session/User';
import { isAsyncLoaded, isAsyncLoading } from '../../state/utils/Async';
import { LoadingView } from '../Loading/LoadingView';
import { LoadedCollectionView } from './LoadedCollectionView';

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

  return <LoadedCollectionView collection={collection.value} handleNewProblem={handleNewProblem} />;
});
