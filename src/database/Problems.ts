
import { collection, doc, Firestore } from "firebase/firestore";
import { emptyBoard, GoRecord } from "../goban/model/goban";

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

export const ProblemCollection = (db: Firestore) => collection(db, "problems");
export const ProblemDoc = (db: Firestore, id: string) => doc(ProblemCollection(db), id);