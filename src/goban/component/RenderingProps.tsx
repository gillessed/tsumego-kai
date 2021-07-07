

export interface RenderingProps {
  boardImagePath: string;
  blackStoneImagePath: string;
  whiteStoneImagePath: string;
  lineColor: string;
  showCoordinates: boolean;
  coordinateFontSize: number;
  font: string;
  coordinateInset: number;
  inset: number;
}

const staticPath = (path: string) => `/${path}`;

export const DefaultRenderingProps: RenderingProps = {
  boardImagePath: staticPath('images/Wood1.jpg'),
  blackStoneImagePath: staticPath('images/BlackStone.svg'),
  whiteStoneImagePath: staticPath('images/WhiteStone.svg'),
  lineColor: '#000000',
  showCoordinates: true,
  coordinateFontSize: 16,
  font: 'Helvetica',
  coordinateInset: 30,
  inset: 10,
}
