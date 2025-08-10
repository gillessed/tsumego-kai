import {
  BreadcrumbProps,
  Breadcrumbs,
  EditableText,
  Icon,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { User } from "firebase/auth";
import React, { useCallback } from "react";
import { Collection } from "../../database/Collections";
import { emptyBoard } from "../../goban/model/goban";
import { useAddProblem } from "../../hooks/useAddProblem";
import { useUpdateCollection } from "../../hooks/useUpdateCollection";
import { AppRoutes } from "../AppRoutes";
import "./CollectionView.css";
import { ProblemCardLoader } from "./ProblemCardLoader";

export interface CollectionViewProps {
  user: User;
  collection: Collection;
}

export const CollectionView = React.memo(
  ({ user, collection }: CollectionViewProps) => {
    const { problemIds, name: loadedName } = collection;
    const [name, setName] = React.useState(loadedName);

    const updateCollection = useUpdateCollection(collection.id);

    const setCollectionName = useCallback((name: string) => {
      updateCollection({name})
    }, [updateCollection]);

    const addProblem = useAddProblem();

    const handleAddProblem = React.useCallback(() => {
      addProblem({
        authorId: user.uid,
        collectionId: collection.id,
        record: emptyBoard(19),
      });
    }, [addProblem, collection.id, user.uid]);

    const breadcrumbs = React.useMemo((): BreadcrumbProps[] => {
      return [
        { href: AppRoutes.collections(), text: "Collections" },
        { href: AppRoutes.collection(collection.id), text: collection.name },
      ];
    }, [collection.id, collection.name]);

    return (
      <div className="collection-view content-view effect-fade-in">
        <div className="collection-header">
          <h2>
            <Breadcrumbs items={breadcrumbs} />
          </h2>
        </div>
        <div className="collection-title">
          <h1>
            <EditableText
              value={name}
              onChange={setName}
              onConfirm={setCollectionName}
            />
          </h1>
        </div>
        <div className="collection-problem-card-container">
          {problemIds.map((problemId) => (
            <ProblemCardLoader
              key={problemId}
              collection={collection}
              problemId={problemId}
            />
          ))}
          <div className="card add-problem-card" onClick={handleAddProblem}>
            <h2>New Tsumego</h2>
            <Icon icon={IconNames.ADD} size={30} color="#03664d" />
          </div>
        </div>
      </div>
    );
  }
);
