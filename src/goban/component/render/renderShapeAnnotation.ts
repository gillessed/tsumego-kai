import { Color } from "../../model/goban";
import { GobanComponentContext } from "../types/GobanComponentContext";
import { renderCircle } from "./renderCircle";
import { renderCross } from "./renderCross";
import { renderLetter } from "./renderLetter";
import { renderSquare } from "./renderSquare";
import { renderTriangle } from "./renderTriangle";

export const renderShapeAnnotation = (
  ctx: GobanComponentContext,
  x: number,
  y: number,
  color: Color,
  opacity: number,
  type: string,
  letter?: string
) => {
  const { c2d, style } = ctx;
  const coordX =
    style.fullInset +
    (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
  const coordY =
    style.fullInset +
    (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;
  c2d.globalAlpha = opacity;
  c2d.lineWidth = 2;
  if (color === "white") {
    c2d.strokeStyle = "#FFFFFF";
  } else {
    c2d.strokeStyle = "#000000";
  }
  if (type === "triangle") {
    renderTriangle(c2d, coordX, coordY, style.stoneSizePixels * 0.35);
  } else if (type === "square") {
    renderSquare(c2d, coordX, coordY, style.stoneSizePixels * 0.26);
  } else if (type === "circle") {
    renderCircle(c2d, coordX, coordY, style.stoneSizePixels * 0.3);
  } else if (type === "letter" && letter) {
    if (color === "white") {
      c2d.strokeStyle = "#000000";
      c2d.fillStyle = "#FFFFFF";
    } else {
      c2d.strokeStyle = "#FFFFFF";
      c2d.fillStyle = "#000000";
    }
    renderLetter(c2d, coordX, coordY, `bold ${24}px ${style.font}`, letter);
  } else if (type === "cross") {
    renderCross(c2d, coordX, coordY, style.stoneSizePixels * 0.35);
  }
};
