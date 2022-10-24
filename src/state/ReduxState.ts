import { SessionState } from "./session/SessionReducer";
import { SolveState } from "./solve/SolveTypes";

export interface ReduxState {
  session: SessionState;
  solve: SolveState;
}
