import { emptyBoard, GoRecord } from "../../goban/model/goban";

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

export interface Collection {
  id: string;
  problemIds: string[];
  authorId: string;
  dateCreated: string;
  lastUpdated: string;
  name: string;
  description: string;
}
export type NewCollection = Omit<Collection, 'id'>;
export const emptyCollection = (userId: string): NewCollection => {
  const date = Date.now().toString();
  return {
    problemIds: [],
    authorId: userId,
    dateCreated: date,
    lastUpdated: date,
    name: 'New Collection',
    description: 'A new tsumego collection',
  };
};
