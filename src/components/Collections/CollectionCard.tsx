import classNames from "classnames";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Collection } from "../../database/Collections";
import { AppRoutes } from "../AppRoutes";
import "./CollectionCard.css";

interface Props {
  collection: Collection;
}

export const CollectionCard = React.memo(({ collection }: Props) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(AppRoutes.collection(collection.id));
  }, [navigate, collection.id]);

  const problemCount = collection.problemIds.length ?? 0;
  const problemString = problemCount === 1 ? "problem" : "problems";
  return (
    <div
      className={classNames("collection-card", "card")}
      onClick={handleClick}
    >
      <h3 className="collection-card-title">{collection.name}</h3>
      <h5 className="collection-card-count">
        {problemCount} {problemString}
      </h5>
      <div className="collection-card-description">
        {collection.description}
      </div>
    </div>
  );
});
