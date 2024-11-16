
import { createRefs } from "./createRefs";

export interface SolveHistory {
  estimatedRank: number;
  
}

export const ProblemsRef = createRefs<SolveHistory>("solveHistory", {
  id: "",
  authorId: "",
  collectionId: "",
  rank: "",
  record: "",
  tags: "",
});