import { arrayUnion, writeBatch } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { AppRoutes } from "../components/AppRoutes";
import { useAppContext } from "../context/AppContext";
import { collectionDoc } from "../database/Collections";
import { NewProblem, Problem, ProblemDoc } from "../database/Problems";

export function useAddProblem() {
  const navigate = useNavigate();
  const { db } = useAppContext();
  return React.useCallback(async (newProblem: NewProblem) => {
    const batch = writeBatch(db);

    const id = v4();
    const problem: Problem = { ...newProblem, id };
    batch.set(ProblemDoc(db, id), problem);

    batch.update(collectionDoc(db, newProblem.collectionId), {
      problemIds: arrayUnion(id),
    });
    await batch.commit();
    navigate(AppRoutes.problemEdit(id));
  }, [navigate, db]);
}