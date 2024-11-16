import { get, push, ref, set } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../components/AppRoutes";
import { useAppContext } from "../context/AppContext";
import { NewProblem, Problem, ProblemsRef } from "../database/Problems";
import { CollectionsRef } from "../database/Collections";

export function useAddProblem() {
  const navigate = useNavigate();
  const { database } = useAppContext();
  return React.useCallback((newProblem: NewProblem) => {
    async function handler() {
      const problemId = push(ref(database, ProblemsRef.root)).key;
      if (problemId == null) {
        return;
      }

      const problem: Problem = { ...newProblem, id: problemId };
      const problemRef = ref(database, ProblemsRef.byId(problemId).value);


      const collectionProblemIds = ref(database, CollectionsRef.byId(newProblem.collectionId).fields.problemIds);
      const snapshot = await get(collectionProblemIds);
      const currentProblemIds: string[] = snapshot.val() ?? [];
      currentProblemIds.push(problemId);
      await set(collectionProblemIds, currentProblemIds);
      await set(problemRef, problem);
      navigate(AppRoutes.problemEdit(problemId));
    }
    handler();
  }, [navigate, database]);
}