export const renderTriangle = (
  c2d: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  c2d.beginPath();
  c2d.moveTo(x, y - r);
  c2d.lineTo(x + r / 1.22, y + r / 1.58);
  c2d.lineTo(x - r / 1.22, y + r / 1.58);
  c2d.closePath();
  c2d.stroke();
};
