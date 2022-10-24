import { EditableText, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { Collections } from '../../state/collections/CollectionsDb';
import { Collection } from '../../state/collections/CollectionsTypes';
import './LoadedCollectionView.scss';
import { ProblemCard } from './ProblemCard';

interface Props {
  collection: Collection;
  handleNewProblem: () => void
}

export const LoadedCollectionView = React.memo(({
  collection,
  handleNewProblem,
}: Props) => {
  const { problemIds, name: loadedName, description: loadedDescription } = collection;
  const [name, setName] = React.useState(loadedName);

  const handleChangeCollectionName = React.useCallback((value: string) => {
    Collections.setName(collection.id, value);
  }, [collection.id]);

  return (
    <div className='collection-view content-view effect-fade-in'>
      <div className='collection-title'>
        <h1><EditableText
          value={name}
          onChange={setName}
          onConfirm={handleChangeCollectionName}
        /></h1>
      </div>
      <div className='collection-problem-card-container'>
        {problemIds.map((problemId) => <ProblemCard key={problemId} collection={collection} problemId={problemId} />)}
        <div className='card add-problem-card' onClick={handleNewProblem}>
          <h2>New Tsumego</h2>
          <Icon icon={IconNames.ADD} iconSize={30} color='#03664d' />
        </div>
      </div>
    </div>
  );
});
