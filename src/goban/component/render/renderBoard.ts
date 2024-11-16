import { GobanComponentContext } from "../GobanComponentContext";

export const renderBoard = (ctx: GobanComponentContext) => {
  const { c2d, boardImage, style } = ctx;
  const { canvasSize } = style;
  const pattern = c2d.createPattern(boardImage.element, "repeat");
  if (pattern != null) {
    c2d.globalAlpha = 1;
    c2d.fillStyle = pattern;
    c2d.fillRect(0, 0, canvasSize.width, canvasSize.height);
  }
};
