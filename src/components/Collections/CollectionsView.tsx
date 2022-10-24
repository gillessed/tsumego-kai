import { Button, Intent, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { isAsyncLoaded, isAsyncLoading } from '../../state/utils/Async';
import { useAsyncAddCollection, useAsyncCollections } from '../../state/collections/CollectionsHooks';
import { User } from '../../state/session/User';
import { LoadingView } from '../Loading/LoadingView';
import { CollectionCard } from './CollectionCard';
import './CollectionsView.scss';

interface Props {
  user: User;
}

export const CollectionsView = React.memo(({
  user,
}: Props) => {

  const collections = useAsyncCollections(user.uid);
  const [handleNewCollection, addingNew] = useAsyncAddCollection(user.uid);

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
