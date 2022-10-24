import { defineAction } from "redoodle"
import { actionName } from "../utils/ActionName"
import { ProblemSet } from "./SolveTypes";

const name = actionName('solve');

const setProblemSet = defineAction(name('setProblemSet'))<ProblemSet>();
const previous = defineAction(name('previousProblem'))<void>();
const next = defineAction(name('nextProblem'))<void>();
const clear = defineAction(name('clear'))<void>();

export const SolveActions = {
  setProblemSet,
  previous,
  next,
  clear,
};
