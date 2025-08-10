import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Collection, collectionDoc, loadSnapshotCollection, } from "../database/Collections";
import { Async, asyncError, asyncLoaded, asyncLoading } from "../utils/Async";

export function useCollection(id: string) {
  const [collection, setCollection] = useState<Async<Collection>>(asyncLoading());

  const { db } = useAppContext();
  
  useEffect(() => {
    const doc = collectionDoc(db, id);
    const unsubscribe = onSnapshot(doc, (snapshot) => {
      const collectionData = snapshot.data();
      if (collectionData == null) {
        setCollection(asyncError(`Collection ${id} could not be found.`));
      } else {
        setCollection(asyncLoaded(loadSnapshotCollection(snapshot.data())));
      }
    });
    return () => {
      setCollection(asyncLoading());
      unsubscribe();
    }
  }, [db, setCollection, id]);

  return collection;
}