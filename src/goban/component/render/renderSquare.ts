export const renderSquare = (
  c2d: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  c2d.beginPath();
  c2d.moveTo(x - r, y - r);
  c2d.lineTo(x + r, y - r);
  c2d.lineTo(x + r, y + r);
  c2d.lineTo(x - r, y + r);
  c2d.closePath();
  c2d.stroke();
};
