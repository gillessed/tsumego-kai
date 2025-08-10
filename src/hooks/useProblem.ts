import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Problem, ProblemDoc } from "../database/Problems";
import { Async, asyncError, asyncLoaded, asyncLoading } from "../utils/Async";

export function useProblem(id: string) {
  const { db } = useAppContext();

  const [problem, setProblem] = useState<Async<Problem>>(asyncLoading());

  useEffect(() => {
    const doc = ProblemDoc(db, id);
    const unsubscribe = onSnapshot(doc, (snapshot) => {
      const problemData = snapshot.data() as Problem;

      if (problemData == null) {
        setProblem(asyncError(`Problem ${id} could not be found.`));
        return;
      }

      for (const boardStateId of Object.keys(problemData.record.boardStates)) {
        const state = problemData.record.boardStates[boardStateId];
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

      setProblem(asyncLoaded(problemData));
    });
    return () => {
      setProblem(asyncLoading());
      unsubscribe();
    };
  }, [db, setProblem, id]);

  return problem;
}
