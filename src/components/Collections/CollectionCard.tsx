import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../AppRoutes";
import "./CollectionCard.css";
import { useCollection } from "../../hooks/useCollection";
import { Classes } from "@blueprintjs/core";
import classNames from "classnames";

interface Props {
  collectionId: string;
}

export const CollectionCard = React.memo(({ collectionId }: Props) => {
  const collection = useCollection(collectionId);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(AppRoutes.collection(collectionId));
  }, [navigate, collectionId]);

  const problemCount = collection.data?.problemIds.length ?? 0;
  const problemString = problemCount === 1 ? "problem" : "problems";
  return (
    <div
      className={classNames("collection-card", "card", {
        [Classes.SKELETON]: collection.isLoading,
      })}
      onClick={handleClick}
    >
      {collection.data != null && (
        <>
          <h3 className="collection-card-title">{collection.data.name}</h3>
          <h5 className="collection-card-count">
            {problemCount} {problemString}
          </h5>
          <div className="collection-card-description">
            {collection.data.description}
          </div>
        </>
      )}
    </div>
  );
});
