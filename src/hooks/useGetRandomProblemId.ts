import { User } from "firebase/auth";
import { Database, get, ref } from "firebase/database";
import { useMemo } from "react";
import { ProblemsByUserIdRef } from "../database/ProblemIdsByUserIds";

export function useGetRandomProblemId(user: User, database: Database) {
  return useMemo(() => async () => {
    const problemsRef = ref(database, ProblemsByUserIdRef.byId(user.uid).value);
    const snapshot = await get(problemsRef);
    if (snapshot == null) {
      return undefined;
    }
    const problemIds: Record<string, string> = snapshot.val();
    return [...Object.keys(problemIds)];
  }, [database, user.uid]);
}