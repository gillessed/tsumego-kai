import { Intersection } from "../../model/goban";
import { DerivedRenderStyle } from "../BoardProps";

export const clipped = (
  intersection: Intersection,
  style: DerivedRenderStyle
) => {
  return (
    intersection.x < style.finalClipRegion.left ||
    intersection.x > style.finalClipRegion.right ||
    intersection.y < style.finalClipRegion.top ||
    intersection.y > style.finalClipRegion.bottom
  );
};
