import { TypedReducer } from "redoodle";
import { SolveActions } from "./SolveActions";
import { ProblemSet, SolveState } from "./SolveTypes";

const setProblemSetReducer = (_: SolveState, payload: ProblemSet): SolveState => {
  return payload;
}

const nextReducer = (state: SolveState): SolveState => {
  if (state == null) {
    return null;
  }
  return { ...state, currentProblemIndex: (state.currentProblemIndex + 1) % state.problemIds.length };
}

const previousReducer = (state: SolveState): SolveState => {
  if (state == null) {
    return null;
  }
  return { ...state, currentProblemIndex: (state.currentProblemIndex + state.problemIds.length - 1) % state.problemIds.length };
}

export const solveReducer = TypedReducer.builder<SolveState>()
  .withDefinitionHandler(SolveActions.setProblemSet, setProblemSetReducer)
  .withDefinitionHandler(SolveActions.next, nextReducer)
  .withDefinitionHandler(SolveActions.previous, previousReducer)
  .withDefinitionHandler(SolveActions.clear, () => null)
  .build();
