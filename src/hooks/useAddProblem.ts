import { User } from "firebase/auth";
import { get, push, ref, update } from "firebase/database";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../components/AppRoutes";
import { useAppContext } from "../context/AppContext";
import { CollectionsRef } from "../database/Collections";
import { NewProblem, Problem, ProblemsRef } from "../database/Problems";
import { ProblemsByUserIdRef } from "../database/ProblemIdsByUserIds";

export function useAddProblem(user: User) {
  const navigate = useNavigate();
  const { database } = useAppContext();
  return React.useCallback((newProblem: NewProblem) => {
    async function handler() {
      const problemId = push(ref(database, ProblemsRef.root)).key;
      if (problemId == null) {
        return;
      }

      const problemIdsPath = CollectionsRef.byId(newProblem.collectionId).fields.problemIds;
      const problem: Problem = { ...newProblem, id: problemId };
      const collectProblemIdsPath = CollectionsRef.byId(newProblem.collectionId).fields.problemIds
      const collectionProblemIdsRef = ref(database, CollectionsRef.byId(newProblem.collectionId).fields.problemIds);
      const collectionProblemIdsSnapshot = await get(collectionProblemIdsRef);
      const updates: Record<string, unknown> = {};
      const currentProblemIds: string[] = collectionProblemIdsSnapshot.val() ?? [];
      currentProblemIds.push(problemId);

      const problemssByUserIdPath = ProblemsByUserIdRef.byId(
        user.uid
      ).byKey(problemId);

      updates[problemIdsPath] = currentProblemIds;
      updates[collectProblemIdsPath] = problem;
      updates[problemssByUserIdPath] = problemId;
      update(ref(database), updates);
      navigate(AppRoutes.problemEdit(problemId));
    }
    handler();
  }, [navigate, database, user.uid]);
}