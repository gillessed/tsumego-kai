import { GobanComponentContext } from "../types/GobanComponentContext";
import { renderBoard } from "./renderBoard";
import { renderCoordinates } from "./renderCoordinates";
import { renderHover } from "./renderHover";
import { renderLastMoveMarkup } from "./renderLastMoveMarkup";
import { renderLines } from "./renderLines";
import { renderMarkups } from "./renderMarkups";
import { renderNextMoves } from "./renderNextMoves";
import { renderStarPoints } from "./renderStarPoints";
import { renderStones } from "./renderStones";


export const renderCanvasComponents = (ctx: GobanComponentContext) => {
  const { c2d, style } = ctx;
  const { canvasSize } = style;

  c2d.clearRect(0, 0, canvasSize.width, canvasSize.width);

  renderBoard(ctx);
  renderLines(ctx);
  renderStarPoints(ctx);
  renderCoordinates(ctx);
  renderStones(ctx);
  renderNextMoves(ctx);
  renderHover(ctx);
  renderMarkups(ctx);
  renderLastMoveMarkup(ctx);
};