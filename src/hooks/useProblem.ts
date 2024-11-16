import { onValue, ref } from "firebase/database";
import { useAppContext } from "../context/AppContext";
import { Problem, ProblemsRef } from "../database/Problems";
import { ProblemQueryKey } from "../query/ProblemQueryKey";
import { useSubscription } from "./useSubscription";

export function useProblem(problemId: string) {
  const { database } = useAppContext();
  const problemRef = ref(database, ProblemsRef.byId(problemId).value);


  return useSubscription(ProblemQueryKey(problemId), (callback: (collections: Problem) => void) => {
    return onValue(problemRef, (snapshot) => {
      const problem = snapshot.val();
      for (const boardStateId of Object.keys(problem.record.boardStates)) {
        const state = problem.record.boardStates[boardStateId];
        if (state.markups == null) {
          state.markups = [];
        }
        if (state.moves == null) {
          state.moves = [];
        }
        if (state.reverseMoves == null) {
          state.reverseMoves = {};
        }
      }
      callback(problem);
    });
  });
}