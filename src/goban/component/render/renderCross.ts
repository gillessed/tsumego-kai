export const renderCross = (
  c2d: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  const lineWidth = c2d.lineWidth;
  c2d.lineWidth = 4;
  c2d.beginPath();
  c2d.moveTo(x, y);
  c2d.lineTo(x + r, y + r);
  c2d.moveTo(x, y);
  c2d.lineTo(x + r, y - r);
  c2d.moveTo(x, y);
  c2d.lineTo(x - r, y + r);
  c2d.moveTo(x, y);
  c2d.lineTo(x - r, y - r);
  c2d.closePath();
  c2d.stroke();
  c2d.lineWidth = lineWidth;
};
