import { ref, set } from "firebase/database";
import React from "react";
import { useAppContext } from "../context/AppContext";
import { Problem, ProblemsRef } from "../database/Problems";

export function useSaveProblem() {
  const { database } = useAppContext();
  return React.useCallback((problem: Problem) => {
    async function handler() {
      const problemRef = ref(database, ProblemsRef.byId(problem.id).value);
      await set(problemRef, problem);
    }
    handler();
  }, [database]);
}