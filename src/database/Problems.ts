
import { emptyBoard, GoRecord } from "../goban/model/goban";
import { createRefs } from "./createRefs";

export interface Problem {
  id: string;
  collectionId: string;
  record: GoRecord;
  tags: string[];
  authorId: string;
  rank: number;
}
export type NewProblem = Omit<Problem, 'id'>;
export const emptyProblem = (userId: string, collectionId: string): NewProblem => ({
  collectionId,
  record: emptyBoard(19),
  tags: [],
  authorId: userId,
  rank: 0,
});

export const ProblemsRef = createRefs<Problem>("problems", {
  id: "",
  authorId: "",
  collectionId: "",
  rank: "",
  record: "",
  tags: "",
});