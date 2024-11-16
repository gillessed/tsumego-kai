import { equalTo, onValue, orderByChild, query, ref } from "firebase/database";
import { Collection, CollectionsRef } from "../database/Collections";
import { useAppContext } from "../context/AppContext";
import { CollectionsQueryKey } from "../query/CollectionsQueryKey";
import { useSubscription } from "./useSubscription";

export function useCollections(userId: string) {
  const { database } = useAppContext();
  const collectionsQuery = query(ref(database, CollectionsRef.root), orderByChild('authorId'), equalTo(userId));

  return useSubscription(CollectionsQueryKey, (callback: (collections: Collection[]) => void) => {
    return onValue(collectionsQuery, (snapshot) => {
      const collectionRecord: Record<string, Collection> = snapshot.val();
      const collections: Collection[] = [];
      for (const collection of Object.values(collectionRecord)) {
        if (collection.problemIds == null) {
          collection.problemIds = [];
        }
        collections.push(collection);
      }
      callback(collections);
    });
  });
}