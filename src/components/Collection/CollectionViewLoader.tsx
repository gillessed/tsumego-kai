import React from 'react';
import { useParams } from 'react-router-dom';
import { AuthProps } from '../RequiredAuth/AuthProps';
import { useCollection } from '../../hooks/useCollection';
import { CollectionView } from './CollectionView';
import { LoadingView } from '../Loading/LoadingView';

export const CollectionViewLoader = React.memo(({
  user,
}: AuthProps) => {
  const { id } = useParams();
  if (id == null) {
    throw Error("Collection id is null");
  }
  const collection = useCollection(id);
  // const [handleNewProblem, addingNew] = useAsyncAddProblem(collectionId, user.data?.uid ?? "");

  if (collection.isLoading) {
    return <LoadingView type='content' />;
  } else if (collection.data == null) {
    return <div>Could not find collection with id {id} </div>
  }
  return <CollectionView user={user} collection={collection.data}/>;
});
