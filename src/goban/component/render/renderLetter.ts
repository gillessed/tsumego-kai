export const renderLetter = (
  c2d: CanvasRenderingContext2D,
  x: number,
  y: number,
  font: string,
  letter: string
) => {
  c2d.lineWidth = 0.8;
  c2d.font = font;
  c2d.textAlign = "center";
  c2d.textBaseline = "middle";
  c2d.fillText(letter, x, y);
  c2d.strokeText(letter, x, y);
};
