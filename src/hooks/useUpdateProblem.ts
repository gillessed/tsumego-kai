import { updateDoc } from "firebase/firestore";
import React from "react";
import { useAppContext } from "../context/AppContext";
import { Problem, ProblemDoc } from "../database/Problems";

export function useUpdateProblem(id: string) {
  const { db } = useAppContext();
  return React.useCallback((updates: Partial<Problem>) => {
    const doc = ProblemDoc(db, id);
    updateDoc(doc, updates);
  }, [db, id]);
}