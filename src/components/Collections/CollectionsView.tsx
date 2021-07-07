import { Button, Intent, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { browserHistory } from '../../history';
import { Async, asyncEmpty, isAsyncLoaded, isAsyncLoading, loadAsyncEffect } from '../../state/Async';
import { Collections } from '../../state/collections/CollectionsHandlers';
import { Collection, emptyCollection } from '../../state/collections/CollectionsTypes';
import { User } from '../../state/session/User';
import { AppRoutes } from '../AppRoutes';
import { LoadingView } from '../Loading/LoadingView';
import { CollectionCard } from './CollectionCard';
import './CollectionsView.scss';

interface Props {
  user: User;
}

export const CollectionsView = React.memo(({
  user,
}: Props) => {

  const [collections, setCollections] = useState<Async<Collection[]>>(asyncEmpty);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadAsyncEffect(setCollections, () => Collections.getCollectionsForUser(user.uid), true), [user.uid]);

  const [addingNew, setAddingNew] = useState<Async<void>>(asyncEmpty);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNewCollection = useCallback(loadAsyncEffect(setAddingNew, async () => {
    const collectionId = await Collections.addNewCollection(emptyCollection(user.uid));
    if (collectionId != null) {
      browserHistory.push(AppRoutes.collection(collectionId));
    }
  }), [user]);

  if (isAsyncLoading(addingNew)) {
    return <LoadingView type='content' />;
  }

  return (
    <div className='collections-view content-view effect-fade-in'>
      <div className='collections-title'>
        <h1>Tsumego Collections</h1>
      </div>

      <Button
        text='New collection'
        icon={IconNames.ADD}
        intent={Intent.PRIMARY}
        onClick={handleNewCollection}
      />

      <div className='collections-card-container'>
        {!isAsyncLoaded(collections) && <Spinner />}
        {isAsyncLoaded(collections) && collections.value.map((collection) => <CollectionCard collection={collection} key={collection.id} />)}
      </div>

    </div>
  );
});
