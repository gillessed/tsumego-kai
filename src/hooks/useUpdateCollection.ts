import { updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { Collection, collectionDoc } from "../database/Collections";

export function useUpdateCollection(id: string) {
  const { db } = useAppContext();
  return useCallback((updates: Partial<Collection>) => {
    const doc = collectionDoc(db, id);
    updateDoc(doc, updates);
  }, [db, id]);
}