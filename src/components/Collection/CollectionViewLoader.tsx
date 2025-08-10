import React from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import {
  isAsyncError,
  isAsyncLoaded,
  isAsyncLoading
} from "../../utils/Async";
import { LoadingView } from "../Loading/LoadingView";
import { AuthProps } from "../RequiredAuth/AuthProps";
import { CollectionView } from "./CollectionView";

export const CollectionViewLoader = React.memo(({ user }: AuthProps) => {
  const { id } = useParams();
  if (id == null) {
    throw Error("Collection id is null");
  }
  const collection = useCollection(id);

  if (isAsyncLoading(collection)) {
    return <LoadingView type="content" />;
  } else if (isAsyncLoaded(collection)) {
    return <CollectionView user={user} collection={collection.value} />;
  } else if (isAsyncError(collection)) {
    return <div>{collection.error}</div>;
  }
});
