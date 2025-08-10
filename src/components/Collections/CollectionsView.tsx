import { Button, Intent, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React, { useState } from "react";
import { useAddCollection } from "../../hooks/useAddCollection";
import { AuthProps } from "../RequiredAuth/AuthProps";
import { CollectionCard } from "./CollectionCard";
import "./CollectionsView.css";
import { isAsyncLoaded, isAsyncLoading } from "../../utils/Async";
import { useCollections } from "../../hooks/useCollections";

export const CollectionsView = React.memo(({ user }: AuthProps) => {
  const collections = useCollections(user);
  const addCollection = useAddCollection();
  const [adding, setAdding] = useState(false);

  const handleClickAddCollection = React.useCallback(() => {
    setAdding(true);
    addCollection({
      authorId: user.uid,
      description: "Description",
      name: "New Collection",
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
        {isAsyncLoading(collections) && <Spinner />}
        {isAsyncLoaded(collections) &&
          collections.value.map((collection) => (
            <CollectionCard collection={collection} key={collection.id} />
          ))}
      </div>
    </div>
  );
});
