import { GobanComponentContext } from "../types/GobanComponentContext";
import { roundToHalf } from "../utils/roundToHalf";

export const renderLines = (ctx: GobanComponentContext) => {
  const { c2d, style, record } = ctx;
  const { fullInset, finalClipRegion, stoneSizePixels, lineColor, canvasSize } =
    style;
  const { width, height } = canvasSize;
  const horizontalLineStart =
    fullInset + (finalClipRegion.left === 0 ? stoneSizePixels / 2 : 0);
  const horizontalLineEnd =
    width -
    fullInset -
    (finalClipRegion.right === record.size - 1 ? stoneSizePixels / 2 : 0);
  const verticalLineStart =
    fullInset + (finalClipRegion.top === 0 ? stoneSizePixels / 2 : 0);
  const verticalLineEnd =
    height -
    fullInset -
    (finalClipRegion.bottom === record.size - 1 ? stoneSizePixels / 2 : 0);

  c2d.strokeStyle = lineColor;
  c2d.lineWidth = 1;
  c2d.beginPath();
  for (let i = finalClipRegion.top; i <= finalClipRegion.bottom; i++) {
    const offset =
      fullInset + stoneSizePixels * (i - finalClipRegion.top + 0.5);
    c2d.moveTo(roundToHalf(horizontalLineStart), roundToHalf(offset));
    c2d.lineTo(roundToHalf(horizontalLineEnd), roundToHalf(offset));
  }
  for (let i = finalClipRegion.left; i <= finalClipRegion.right; i++) {
    const offset =
      fullInset + stoneSizePixels * (i - finalClipRegion.left + 0.5);
    c2d.moveTo(roundToHalf(offset), roundToHalf(verticalLineStart));
    c2d.lineTo(roundToHalf(offset), roundToHalf(verticalLineEnd));
  }
  c2d.stroke();
};
