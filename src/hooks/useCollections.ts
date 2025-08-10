import { User } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Collection, collectionCollection, loadSnapshotCollection } from "../database/Collections";
import { Async, asyncLoaded, asyncLoading } from "../utils/Async";

export function useCollections(user: User) {
  const [collections, setCollections] = useState<Async<Collection[]>>(asyncLoading());

  const { db } = useAppContext();

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionCollection(db), (snapshot) => {
      const collectionDocs: Collection[] = [];
      for (const doc of snapshot.docs) {
        collectionDocs.push(loadSnapshotCollection(doc.data()));
      }
      setCollections(asyncLoaded(collectionDocs));
    });
    return () => {
      setCollections(asyncLoading());
      unsubscribe();
    }
  }, [db, setCollections, user]);

  return collections;
}
