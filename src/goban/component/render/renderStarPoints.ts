import { GobanComponentContext } from "../GobanComponentContext";

export const renderStarPoints = (ctx: GobanComponentContext) => {
  const { c2d, style, record } = ctx;
  const { lineColor, fullInset, finalClipRegion, stoneSizePixels } = style;
  c2d.fillStyle = lineColor;
  c2d.globalAlpha = 1;
  const size = record.size;
  const starPoints: [number, number][] = [];
  if (size % 2 == 1) {
    if (size == 5) {
      starPoints.push([1, 1]);
      starPoints.push([1, 3]);
      starPoints.push([3, 1]);
      starPoints.push([3, 3]);
    } else if (size >= 7 && size <= 15) {
      starPoints.push([2, 2]);
      starPoints.push([size - 3, 2]);
      starPoints.push([2, size - 3]);
      starPoints.push([size - 3, size - 3]);
      starPoints.push([~~(size / 2) + 1, ~~(size / 2) + 1]);
    } else {
      const start = 3;
      const mid = ~~(size / 2);
      const end = size - 4;
      starPoints.push([start, start]);
      starPoints.push([start, mid]);
      starPoints.push([start, end]);
      starPoints.push([mid, start]);
      starPoints.push([mid, mid]);
      starPoints.push([mid, end]);
      starPoints.push([end, start]);
      starPoints.push([end, mid]);
      starPoints.push([end, end]);
    }
    for (const point of starPoints) {
      const screengridx = point[0] - finalClipRegion.left;
      const screengridy = point[1] - finalClipRegion.top;
      const x = fullInset + (screengridx + 0.5) * stoneSizePixels;
      const y = fullInset + (screengridy + 0.5) * stoneSizePixels;
      if (
        point[0] >= finalClipRegion.left &&
        point[0] <= finalClipRegion.right &&
        point[1] >= finalClipRegion.top &&
        point[1] <= finalClipRegion.bottom
      ) {
        c2d.beginPath();
        c2d.arc(x, y, 3, 0, 3.1415 * 2);
        c2d.fill();
      }
    }
  }
};
