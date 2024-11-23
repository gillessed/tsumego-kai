
import { emptyBoard, GoRecord } from "../goban/model/goban";
import { createRefs } from "./createRefs";

export interface Problem {
  id: string;
  collectionId: string;
  record: GoRecord;
  authorId: string;
}
export type NewProblem = Omit<Problem, 'id'>;
export const emptyProblem = (userId: string, collectionId: string): NewProblem => ({
  collectionId,
  record: emptyBoard(19),
  authorId: userId,
});

export const ProblemsRef = createRefs<Problem>("problems", {
  id: "",
  authorId: "",
  collectionId: "",
  record: "",
});