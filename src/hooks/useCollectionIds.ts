import { User } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useAppContext } from "../context/AppContext";
import { CollectionIdsQueryKey } from "../query/CollectionIdsQueryKey";
import { useSubscription } from "./useSubscription";
import { CollectionIdsByUserIdsRef } from "../database/CollectionIdsByUserIds";

export function useCollectionIds(user: User) {
  const { database } = useAppContext();
  const collectionIdsRef = ref(
    database,
    CollectionIdsByUserIdsRef.byId(user.uid).value,
  );

  return useSubscription(
    CollectionIdsQueryKey,
    (callback: (collectionIds: string[]) => void) => {
      return onValue(collectionIdsRef, (snapshot) => {
        const value = snapshot.val();
        const collectionIds = value != null ? Object.keys(snapshot.val()) : [];
        callback(collectionIds);
      });
    }
  );
}
