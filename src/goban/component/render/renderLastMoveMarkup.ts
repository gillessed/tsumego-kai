import { GobanComponentContext } from "../types/GobanComponentContext";
import { clipped } from "../utils/clipped";
import { renderShapeAnnotation } from "./renderShapeAnnotation";

export const renderLastMoveMarkup = (ctx: GobanComponentContext) => {
  const { style, record, editorState } = ctx;
  const numberOfMoves = editorState.moveStack.length;
  if (editorState.moveStack.length === 0) {
    return;
  }
  const lastMoveId = editorState.moveStack[numberOfMoves - 1];
  const currentBoardstate = record.boardStates[editorState.currentBoardState];
  const previousBoardstate =
    record.boardStates[
      currentBoardstate.reverseMoves[lastMoveId].previousState
    ];
  const lastMove = previousBoardstate.moves.find(
    (move) => move.id === lastMoveId
  );
  if (!lastMove) {
    return;
  }
  const stone =
    currentBoardstate.stones[
      lastMove.intersection.y * record.size + lastMove.intersection.x
    ];
  if (stone === "empty") {
    return;
  }
  if (clipped(lastMove.intersection, style)) {
    return;
  }
  const color = stone === "black" ? "white" : "black";
  renderShapeAnnotation(
    ctx,
    lastMove.intersection.x,
    lastMove.intersection.y,
    color,
    1,
    "circle"
  );
};
