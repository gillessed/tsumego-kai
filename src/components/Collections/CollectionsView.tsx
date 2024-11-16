import { Button, Intent, Spinner } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { useAddCollection } from "../../hooks/useAddCollection";
import { useCollections } from "../../hooks/useCollections";
import { isAsyncLoading } from "../../utils/Async";
import { LoadingView } from "../Loading/LoadingView";
import { CollectionCard } from "./CollectionCard";
import "./CollectionsView.css";
import { AuthProps } from "../RequiredAuth/AuthProps";

export const CollectionsView = React.memo(({ user }: AuthProps) => {
  const collections = useCollections(user.uid);
  const [addCollection, addingNew] = useAddCollection();

  const handleClickAddCollection = React.useCallback(() => {
    addCollection({
      authorId: user.uid,
      description: "",
      lastUpdated: `${Date.now()}`,
      dateCreated: `${Date.now()}`,
      name: "",
      problemIds: [],
    });
  }, [addCollection, user.uid]);

  if (isAsyncLoading(addingNew)) {
    return <LoadingView type="content" />;
  }

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
      />

      <div className="collections-card-container">
        {collections.isLoading && <Spinner />}
        {collections.isFetched &&
          collections.data != null &&
          collections.data.map((collection) => (
            <CollectionCard collection={collection} key={collection.id} />
          ))}
      </div>
    </div>
  );
});
