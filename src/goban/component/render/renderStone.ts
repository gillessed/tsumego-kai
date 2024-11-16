import { Color } from "../../model/goban";
import { GobanComponentContext } from "../GobanComponentContext";

export const renderStone = (
  ctx: GobanComponentContext,
  x: number,
  y: number,
  color: Color,
  opacity: number
) => {
  const { c2d, blackStoneImage, whiteStoneImage, style } = ctx;
  if (!blackStoneImage?.loaded || !whiteStoneImage?.loaded) {
    return;
  }
  const coordX =
    style.fullInset +
    (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
  const coordY =
    style.fullInset +
    (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;
  const radius = style.stoneSizePixels * 0.47;
  c2d.globalAlpha = opacity;
  let image: HTMLImageElement;
  if (color === "white") {
    image = whiteStoneImage.element;
  } else {
    image = blackStoneImage.element;
  }
  if (opacity === 1) {
    c2d.shadowColor = "#444444";
    c2d.shadowOffsetX = radius / 20;
    c2d.shadowOffsetY = radius / 20;
  }
  c2d.drawImage(
    image,
    coordX - radius,
    coordY - radius,
    radius * 2,
    radius * 2
  );
  c2d.shadowBlur = 0;
  c2d.shadowOffsetX = 0;
  c2d.shadowOffsetY = 0;
};
