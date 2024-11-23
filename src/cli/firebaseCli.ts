/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "firebase/auth";
import { get, ref, remove } from "firebase/database";
import { AppContextType } from "../context/AppContext";
import { CollectionIdsByUserIdsRef } from "../database/CollectionIdsByUserIds";
import { CollectionsRef } from "../database/Collections";
import { ProblemsByUserIdRef } from "../database/ProblemIdsByUserIds";
import { ProblemsRef } from "../database/Problems";

export function registerFirebaseCli(appContext: AppContextType) {
  const { auth, database } = appContext;
  auth.onAuthStateChanged((user: User | null) => {
    if (user == null) {
      delete (window as any).firebase;
    } else {
      console.log(`registering window.firebase for ${user.displayName}`);
      (window as any).firebase = {
        clear: async () => {
          const result = confirm("Are you sure you want to clear the entire database?");
          if (result) {
            await remove(ref(database, CollectionsRef.root));
            await remove(ref(database, ProblemsRef.root));
            await remove(ref(database, CollectionIdsByUserIdsRef.root));
            await remove(ref(database, ProblemsByUserIdRef.root));
          }
        },
        loadPath: async (path: string) => {
          if (typeof path !== "string" || path === "") {
            console.log(`${path} is not a valid value for problem count`);
          }
          const pathRef = ref(database, path);
          const value = (await get(pathRef)).val();
          console.log(value);
        }
      };
    }
  });
}
