import { SessionState } from "./session/SessionState";
import { SolveState } from "./solve/SolveTypes";

export interface ReduxState {
  session: SessionState;
  solve: SolveState;
}
