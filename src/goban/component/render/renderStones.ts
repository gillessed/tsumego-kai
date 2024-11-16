import { GobanComponentContext } from "../GobanComponentContext";
import { renderStone } from "./renderStone";

export const renderStones = (ctx: GobanComponentContext) => {
  const { style, record, editorState } = ctx;
  for (
    let x = style.finalClipRegion.left;
    x <= style.finalClipRegion.right;
    x++
  ) {
    for (
      let y = style.finalClipRegion.top;
      y <= style.finalClipRegion.bottom;
      y++
    ) {
      const coord = record.size * y + x;
      const stoneColor =
        record.boardStates[editorState.currentBoardState].stones[coord];
      if (stoneColor === "white" || stoneColor === "black") {
        renderStone(ctx, x, y, stoneColor, 1);
      }
    }
  }
};
