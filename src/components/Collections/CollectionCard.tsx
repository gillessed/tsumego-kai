import React from "react";
import { useCallback } from "react";
import { browserHistory } from "../../history";
import { Collection } from "../../state/collections/CollectionsTypes";
import { AppRoutes } from "../AppRoutes";
import "./CollectionCard.scss";

interface Props {
  collection: Collection;
}

export const CollectionCard = React.memo(({
  collection
}: Props) => {

  const handleClick = useCallback(() => {
    browserHistory.push(AppRoutes.collection(collection.id));
  }, [collection.id]);

  const problemCount = collection.problemIds.length;
  const problemString = problemCount === 1 ? 'problem' : 'problems';
  return (
    <div className='collection-card card' onClick={handleClick}>
      <h3 className='collection-card-title'>{collection.name}</h3>
      <h5 className='collection-card-count'> {problemCount} {problemString} </h5>
      <div className='collection-card-description'>{collection.description}</div>
    </div>
  );
});
