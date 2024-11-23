import { Button, Intent, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React, { useState } from "react";
import { useAddCollection } from "../../hooks/useAddCollection";
import { useCollectionIds } from "../../hooks/useCollectionIds";
import { AuthProps } from "../RequiredAuth/AuthProps";
import { CollectionCard } from "./CollectionCard";
import "./CollectionsView.css";

export const CollectionsView = React.memo(({ user }: AuthProps) => {
  const collectionIds = useCollectionIds(user);
  const addCollection = useAddCollection(user);
  const [adding, setAdding] = useState(false);

  const handleClickAddCollection = React.useCallback(() => {
    setAdding(true);
    addCollection({
      authorId: user.uid,
      description: "",
      name: "",
      problemIds: [],
    });
  }, [addCollection, user.uid]);

  return (
    <div className="collections-view content-view effect-fade-in">
      <div className="collections-title">
        <h1>Tsumego Collections</h1>
      </div>

      <Button
        text="New collection"
        icon={IconNames.ADD}
        intent={Intent.PRIMARY}
        onClick={handleClickAddCollection}
        loading={adding}
      />

      <div className="collections-card-container">
        {collectionIds.isLoading && <Spinner />}
        {collectionIds.isFetched &&
          collectionIds.data != null &&
          collectionIds.data.map((collectionId) => (
            <CollectionCard collectionId={collectionId} key={collectionId} />
          ))}
      </div>
    </div>
  );
});
