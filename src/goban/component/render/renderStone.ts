import { Color } from "../../model/goban";
import { AnimationParams } from "../types/AnimationParams";
import { GobanComponentContext } from "../types/GobanComponentContext";
import { applyAnimation } from "../utils/applyAnimation";

export const renderStone = (
  ctx: GobanComponentContext,
  x: number,
  y: number,
  color: Color,
  opacity: number,
  drawShadow: boolean,
) => {
  const { c2d, blackStoneImage, whiteStoneImage, style, animationState, timestamp } = ctx;
  const { animations } = animationState;
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
  let image: HTMLImageElement;
  if (color === "white") {
    image = whiteStoneImage.element;
  } else {
    image = blackStoneImage.element;
  }
  if (drawShadow) {
    c2d.shadowColor = "#444444";
    c2d.shadowOffsetX = radius / 20;
    c2d.shadowOffsetY = radius / 20;
  }


  let drawParams: AnimationParams = {
    coordX,
    coordY,
    opacity,
  };
  for (const animation of animations) {
    if (animation.x === x && animation.y === y) {
      drawParams = applyAnimation(animation, drawParams, timestamp);
    }
  }

  c2d.globalAlpha = drawParams.opacity;
  c2d.drawImage(
    image,
    drawParams.coordX - radius,
    drawParams.coordY - radius,
    radius * 2,
    radius * 2
  );
  c2d.shadowBlur = 0;
  c2d.shadowOffsetX = 0;
  c2d.shadowOffsetY = 0;
};
