import { findReachableStates } from "../../model/selectors";
import { shouldRenderNextMoves } from "../EditorState";
import { GobanComponentContext } from "./render";
import { clipped } from "../utils/clipped";

export const renderNextMoves = (ctx: GobanComponentContext) => {
  const { c2d, style, record, editorState } = ctx;
  if (!shouldRenderNextMoves(editorState.mode)) {
    return false;
  }
  const currentBoardstate = record.boardStates[editorState.currentBoardState];
  const movesToDraw = currentBoardstate.moves.filter(
    (move) => !clipped(move.intersection, style)
  );
  for (const nextMove of movesToDraw) {
    const { intersection } = nextMove;
    if (
      currentBoardstate.stones[
        intersection.y * record.size + intersection.x
      ] !== "empty"
    ) {
      throw new Error(
        "We gonna have problem. There is a move where there is a stone."
      );
    }

    const { x, y } = intersection;
    const coordX =
      style.fullInset +
      (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
    const coordY =
      style.fullInset +
      (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;

    const gradient = c2d.createRadialGradient(
      coordX,
      coordY,
      1,
      coordX,
      coordY,
      20
    );
    gradient.addColorStop(0, "#FFFFFFCC");
    gradient.addColorStop(1, "#FFFFFF00");
    c2d.fillStyle = gradient;
    c2d.arc(coordX, coordY, 30, 0, 3.14159 * 2);
    c2d.fill();
  }
  let index = 0;
  const mode = editorState.mode;
  for (const nextMove of movesToDraw) {
    index++;
    const { intersection } = nextMove;
    const { x, y } = intersection;

    const coordX =
      style.fullInset +
      (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
    const coordY =
      style.fullInset +
      (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;

    const letter = `${index}`;
    c2d.lineWidth = 0.8;
    c2d.font = `bold ${style.stoneSizePixels}px ${style.font}`;
    c2d.textAlign = "center";
    c2d.textBaseline = "middle";
    if (mode === "edit" || mode === "solution") {
      const nextBoardState = record.boardStates[nextMove.nextState];
      const reachableStates = [
        ...findReachableStates(record, nextBoardState.id),
      ];
      const correctState = reachableStates
        .map((stateId) => record.boardStates[stateId])
        .find((state) => !!state.correct);
      if (correctState) {
        c2d.fillStyle = "#00CC22";
      } else {
        c2d.fillStyle = "#FF0000";
      }
    } else {
      c2d.fillStyle = "#0066FF";
    }
    c2d.fillText(letter, coordX, coordY);
  }
};
