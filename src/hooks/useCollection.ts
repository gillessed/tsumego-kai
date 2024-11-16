import { onValue, ref } from "firebase/database";
import { Collection, CollectionsRef } from "../database/Collections";
import { useAppContext } from "../context/AppContext";
import { CollectionQueryKey } from "../query/CollectionQueryKey";
import { useSubscription } from "./useSubscription";

export function useCollection(collectionId: string) {
  const { database } = useAppContext();
  const collectionRef = ref(database, CollectionsRef.byId(collectionId).value);

  return useSubscription(CollectionQueryKey(collectionId), (callback: (collections: Collection) => void) => {
    return onValue(collectionRef, (snapshot) => {
      const collection = snapshot.val();
      if (collection.problemIds == null) {
        collection.problemIds = [];
      }
      callback(collection);
    });
  });
}