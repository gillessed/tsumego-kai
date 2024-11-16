import { push, ref, set } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../components/AppRoutes";
import { Collection, CollectionsRef, NewCollection } from "../database/Collections";
import { useAppContext } from "../context/AppContext";
import { Async, asyncEmpty, asyncHandler } from "../utils/Async";

export const useAddCollection = (): [(newCollection: NewCollection) => void, Async<void>] => {
  const navigate = useNavigate();
  const { database } = useAppContext();
  const [loading, setLoading] = React.useState<Async<void>>(asyncEmpty);
  const handleNewCollection = React.useCallback((newCollection: NewCollection) => asyncHandler(setLoading, async () => {
    const collectionId = push(ref(database, CollectionsRef.root)).key;
    if (collectionId == null) {
      return;
    }

    const collection: Collection = { ...newCollection, id: collectionId };
    const collectionRef = ref(database, CollectionsRef.byId(collectionId).value);
    await set(collectionRef, collection);
    navigate(AppRoutes.collection(collectionId));
  })(), [navigate, database]);
  return [handleNewCollection, loading];
}