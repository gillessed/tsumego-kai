import { Collection, Problem } from "../collections/CollectionsTypes";
import { ReduxState } from "../ReduxState";

export interface ProblemSet {
  problemIds: string[];
  currentProblemIndex: number;
}

export type SolveState = ProblemSet | null;

export const getSolveState = (state: ReduxState) => state.solve;
