export const renderCircle = (
  c2d: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number
) => {
  c2d.beginPath();
  c2d.arc(x, y, r, 0, 3.1415 * 2);
  c2d.stroke();
};
