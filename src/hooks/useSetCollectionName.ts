import { ref, update } from "firebase/database";
import React from "react";
import { CollectionsRef } from "../database/Collections";
import { useAppContext } from "../context/AppContext";

export function useSetCollectionName(collectionId: string) {
  const { database } = useAppContext();
  return React.useCallback((name: string) => {
    async function handler() {
      const updates: Record<string, string> = {};
      updates[CollectionsRef.byId(collectionId).fields.name] = name;
      await update(ref(database), updates);
    }
    handler();
  }, [database, collectionId]);
}