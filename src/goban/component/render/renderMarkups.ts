import { hasMoveAtIntersection } from "../../model/accessors";
import { Color } from "../../model/goban";
import { shouldRenderNextMoves } from "../EditorState";
import { GobanComponentContext } from "./render";
import { clipped } from "../utils/clipped";
import { renderShapeAnnotation } from "./renderShapeAnnotation";

export const renderMarkups = (ctx: GobanComponentContext) => {
  const { style, record, editorState } = ctx;
  const currentBoardstate = record.boardStates[editorState.currentBoardState];
  let letterIndex = 0;
  for (const markup of currentBoardstate.markups) {
    const { intersection } = markup;
    if (clipped(intersection, style)) {
      continue;
    }
    if (hasMoveAtIntersection(currentBoardstate, intersection.x, intersection.y)
      && shouldRenderNextMoves(editorState.mode)) {
      continue;
    }
    const state = currentBoardstate.stones[intersection.y * record.size + intersection.x];
    const color: Color = state === 'black' ? 'white' : 'black';
    let letter: string | undefined;
    if (markup.type === 'letter') {
      letter = String.fromCharCode(letterIndex + 97);
      letterIndex++;
    }
    renderShapeAnnotation(ctx, intersection.x, intersection.y, color, 1, markup.type, letter);
  }
}
