import { GobanComponentContext } from "../types/GobanComponentContext";
import { getLetterCoordinate } from "../utils/getLetterCoordinate";

export const renderCoordinates = (ctx: GobanComponentContext) => {
  const { c2d, style } = ctx;
  const {
    inset,
    fullInset,
    finalClipRegion,
    stoneSizePixels,
    coordinateInset,
    showCoordinates,
    canvasSize,
    coordinateFontSize,
    font,
  } = style;
  const { width, height } = canvasSize;
  if (!showCoordinates) {
    return false;
  }
  const top = inset + coordinateInset / 2;
  const bottom = height - inset - coordinateInset / 2;
  const left = inset + coordinateInset / 2;
  const right = width - inset - coordinateInset / 2;

  c2d.fillStyle = "#000000";
  c2d.font = `bold ${coordinateFontSize}px ${font}`;
  c2d.globalAlpha = 1;
  c2d.textAlign = "center";
  c2d.textBaseline = "middle";
  for (let i = finalClipRegion.top; i <= finalClipRegion.bottom; i++) {
    c2d.fillText(
      `${i + 1}`,
      left,
      fullInset + (i - finalClipRegion.top + 0.5) * stoneSizePixels
    );
    c2d.fillText(
      `${i + 1}`,
      right,
      fullInset + (i - finalClipRegion.top + 0.5) * stoneSizePixels
    );
  }

  for (let i = finalClipRegion.left; i <= finalClipRegion.right; i++) {
    c2d.fillText(
      getLetterCoordinate(i),
      fullInset + (i - finalClipRegion.left + 0.5) * stoneSizePixels,
      top
    );
    c2d.fillText(
      getLetterCoordinate(i),
      fullInset + (i - finalClipRegion.left + 0.5) * stoneSizePixels,
      bottom
    );
  }
};
