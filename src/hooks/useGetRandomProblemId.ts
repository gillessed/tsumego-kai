import { User } from "firebase/auth";
import { Firestore } from "firebase/firestore";

export function useGetRandomProblemId(user: User, database: Firestore) {
  // return useMemo(() => async () => {
  //   const problemsRef = ref(database, ProblemsByUserIdRef.byId(user.uid).value);
  //   const snapshot = await get(problemsRef);
  //   if (snapshot == null) {
  //     return undefined;
  //   }
  //   const problemIds: Record<string, string> = snapshot.val();
  //   return [...Object.keys(problemIds)];
  // }, [database, user.uid]);
  return [];
}