import { User } from "firebase/auth";
import { push, ref, update } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../components/AppRoutes";
import { useAppContext } from "../context/AppContext";
import { CollectionIdsByUserIdsRef } from "../database/CollectionIdsByUserIds";
import {
  Collection,
  CollectionsRef,
  NewCollection,
} from "../database/Collections";

export const useAddCollection = (user: User) => {
  const navigate = useNavigate();
  const { database } = useAppContext();
  return React.useCallback(
    (newCollection: NewCollection) => {
      async function handler() {
        const collectionId = push(ref(database, CollectionsRef.root)).key;
        if (collectionId == null) {
          return;
        }

        const collection: Collection = { ...newCollection, id: collectionId };
        const collectionPath = CollectionsRef.byId(collectionId).value;

        const collectionsByUserIdPath = CollectionIdsByUserIdsRef.byId(
          user.uid
        ).byKey(collectionId);

        const updates: Record<string, unknown> = {};
        updates[collectionPath] = collection;
        updates[collectionsByUserIdPath] = collectionId;
        await update(ref(database), updates);
        navigate(AppRoutes.collection(collectionId));
      }
      handler();
    },
    [navigate, database, user.uid]
  );
};
