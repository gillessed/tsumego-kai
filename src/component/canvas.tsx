import React from 'react';
import { GoRecord, Color } from '../model/goban';
import { ImageAsset } from './imageAsset';
import { EditorState } from './editorState';

const defaultRenderingProps: RenderingProps = {
  boardImagePath: '/static/images/Wood.jpg',
  blackStoneImagePath: '/static/images/BlackStone.svg',
  whiteStoneImagePath: '/static/images/WhiteStone.svg',
  lineColor: '#000000',
  showCoordinates: true,
  coordinateFontSize: 16,
  coordinateFont: 'Helvetica',
  coordinateInset: 30,
  inset: 10,
}

export interface ClipRegion {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface RenderingProps {
  boardImagePath: string;
  blackStoneImagePath: string;
  whiteStoneImagePath: string;
  lineColor: string;
  showCoordinates: boolean;
  coordinateFontSize: number;
  coordinateFont: string;
  coordinateInset: number;
  inset: number;
  clipRegion?: ClipRegion;
  fitToStoneSize?: number;
};

export type DerivedRenderStyle = RenderingProps & {
  fullInset: number;
  widthPixels: number;
  heightPixels: number;
  stoneSizePixels: number;
  finalClipRegion: ClipRegion;
};

export interface BoardProps {
  goRecord: GoRecord;
  editorState: EditorState;
  renderingProps?: Partial<RenderingProps>;
}

interface State {
  divWidth: number;
  divHeight: number;
}

export class BoardCanvas extends React.PureComponent<BoardProps, State> {
  private div: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private canvasWidth: number;
  private canvasHeight: number;
  private windowResizeListener: any;
  private mouseCoordinates?: { x: number, y: number };
  private whiteStoneImage: ImageAsset;
  private blackStoneImage: ImageAsset;
  private boardImage: ImageAsset;

  constructor(props: BoardProps) {
    super(props);
    this.state = {
      divWidth: 0,
      divHeight: 0,
    };
  }

  ///////////////
  // Lifecycle //
  ///////////////

  public componentWillMount() {
    const style = this.getRenderStyle(this.props);
    this.boardImage = new ImageAsset(style.boardImagePath, () => requestAnimationFrame(this.renderCanvas));
    this.whiteStoneImage = new ImageAsset(style.whiteStoneImagePath, () => requestAnimationFrame(this.renderCanvas));
    this.blackStoneImage = new ImageAsset(style.blackStoneImagePath, () => requestAnimationFrame(this.renderCanvas));

    this.windowResizeListener = window.addEventListener('resize', () => {
      this.computeCanvasSize();
      this.canvas.width = this.canvasWidth;
      this.canvas.height = this.canvasHeight;
      requestAnimationFrame(this.renderCanvas);
    });
  }

  public componentWillUnmount() {
    window.removeEventListener(this.windowResizeListener);
    this.canvas.removeEventListener('mouseout');
    this.canvas.removeEventListener('mouseup');
    this.canvas.removeEventListener('mousemove');
  }

  //////////////////////////
  // Render html elements //
  //////////////////////////

  public render() {
    const style = this.getRenderStyle(this.props);
    let divWidth = '100%';
    let divHeight = '100%';
    if (style.fitToStoneSize !== undefined) {
      let clipRegion = {
        top: 0,
        bottom: this.props.goRecord.size - 1,
        left: 0,
        right: this.props.goRecord.size - 1,
      };
      if (style.clipRegion) {
        clipRegion = style.clipRegion;
      }
      const inset = style.inset + style.coordinateInset;
      divWidth = `${(clipRegion.right - clipRegion.left + 1) * style.fitToStoneSize + inset * 2}px`;
      divHeight = `${(clipRegion.bottom - clipRegion.top + 1) * style.fitToStoneSize + inset * 2}px`;
    }

    return (
      <div ref={(element) => {
        if (element && !this.div) {
          this.div = element;
          this.forceUpdate();
        }
      }} style={{ width: divWidth, height: divHeight }}>
        {this.renderCanvasElement()}
      </div>
    );
  }

  private renderCanvasElement() {
    if (this.div) {
      this.computeCanvasSize();
      if (this.canvas) {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        requestAnimationFrame(this.renderCanvas);
      }
      return (
        <canvas ref={(element) => {
          if (element && !this.canvas) {
            this.canvas = element;
            this.canvas.addEventListener('mousemove', this.onMouseOver);
            this.canvas.addEventListener('mouseup', this.onMouseUp);
            this.canvas.addEventListener('mouseout', this.onMouseOut);
            this.canvas.onmouseover = this.onMouseOver;
            requestAnimationFrame(this.renderCanvas);
          }
        }} width={this.canvasWidth} height={this.canvasHeight} />
      );
    } else {
      return undefined;
    }
  }

  /////////////////////
  // Canvas Renderer //
  /////////////////////

  private renderCanvas = () => {
    if (!this.canvas || !this.boardImage.loaded) {
      return;
    }
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const style = this.getDerivedRenderStyle(this.props);
    this.renderBoard(ctx, style);
    this.renderLines(ctx, style);
    this.renderStarPoints(ctx, style);
    this.renderCoordinates(ctx, style);
    this.renderStones(ctx, style);
    this.renderHover(ctx, style);
  }

  private renderBoard(ctx: CanvasRenderingContext2D, _: DerivedRenderStyle) {
    const pattern = ctx.createPattern(this.boardImage.element, 'repeat');
    ctx.globalAlpha = 1;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private renderLines(ctx: CanvasRenderingContext2D, style: DerivedRenderStyle) {
    const horizontalLineStart = style.fullInset + (style.finalClipRegion.left === 0 ? style.stoneSizePixels / 2 : 0);
    const horizontalLineEnd = style.widthPixels - style.fullInset - (style.finalClipRegion.right === this.props.goRecord.size - 1 ? style.stoneSizePixels / 2 : 0);
    const verticalLineStart = style.fullInset + (style.finalClipRegion.top === 0 ? style.stoneSizePixels / 2 : 0);
    const verticalLineEnd = style.heightPixels - style.fullInset - (style.finalClipRegion.bottom === this.props.goRecord.size - 1 ? style.stoneSizePixels / 2 : 0);

    ctx.globalAlpha = 1;
    ctx.strokeStyle = style.lineColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = style.finalClipRegion.top; i <= style.finalClipRegion.bottom; i++) {
      const offset = style.fullInset + style.stoneSizePixels * (i - style.finalClipRegion.top + 0.5);
      ctx.moveTo(horizontalLineStart, offset);
      ctx.lineTo(horizontalLineEnd, offset);
    }
    for (let i = style.finalClipRegion.left; i <= style.finalClipRegion.right; i++) {
      const offset = style.fullInset + style.stoneSizePixels * (i - style.finalClipRegion.left + 0.5);
      ctx.moveTo(offset, verticalLineStart);
      ctx.lineTo(offset, verticalLineEnd);
    }
    ctx.stroke();
  }

  private renderStarPoints(ctx: CanvasRenderingContext2D, style: DerivedRenderStyle) {
    ctx.fillStyle = style.lineColor;
    ctx.globalAlpha = 1;
    const size = this.props.goRecord.size;
    let starPoints: [number, number][] = [];
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
        const x = style.fullInset + (point[0] + 0.5) * style.stoneSizePixels;
        const y = style.fullInset + (point[1] + 0.5) * style.stoneSizePixels;
        if (point[0] >= style.finalClipRegion.left && point[0] <= style.finalClipRegion.right
          && point[1] >= style.finalClipRegion.top && point[1] <= style.finalClipRegion.bottom) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 3.1415 * 2);
          ctx.fill();
        }
      }
    }
  }

  private renderCoordinates(ctx: CanvasRenderingContext2D, style: DerivedRenderStyle) {
    if (!style.showCoordinates) {
      return false;
    }
    const top = style.inset + style.coordinateInset / 2;
    const bottom = style.heightPixels - style.inset - style.coordinateInset / 2;
    const left = style.inset + style.coordinateInset / 2;
    const right = style.widthPixels - style.inset - style.coordinateInset / 2;

    ctx.fillStyle = '#000000';
    ctx.font = `bold ${style.coordinateFontSize}px ${style.coordinateFont}`;
    ctx.globalAlpha = 1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = style.finalClipRegion.top; i <= style.finalClipRegion.bottom; i++) {
      ctx.fillText(`${i + 1}`, left, style.fullInset + (i - style.finalClipRegion.top + 0.5) * style.stoneSizePixels);
      ctx.fillText(`${i + 1}`, right, style.fullInset + (i - style.finalClipRegion.top + 0.5) * style.stoneSizePixels);
    }

    for (let i = style.finalClipRegion.left; i <= style.finalClipRegion.right; i++) {
      ctx.fillText(this.getLetterCoordinate(i), style.fullInset + (i - style.finalClipRegion.left + 0.5) * style.stoneSizePixels, top);
      ctx.fillText(this.getLetterCoordinate(i), style.fullInset + (i - style.finalClipRegion.left + 0.5) * style.stoneSizePixels, bottom);
    }
  }

  private getLetterCoordinate(index: number): string {
    if (index <= 8) {
      return String.fromCharCode(index + 65);
    } else if (index >= 8 && index <= 24) {
      return String.fromCharCode(index + 66);
    } else {
      return this.getLetterCoordinate(~~(index / 25) - 1) + this.getLetterCoordinate(index % 25)
    }
  }

  private renderStones(ctx: CanvasRenderingContext2D, style: DerivedRenderStyle) {
    for (let x = style.finalClipRegion.left; x <= style.finalClipRegion.right; x++) {
      for (let y = style.finalClipRegion.top; y <= style.finalClipRegion.bottom; y++) {
        const coord = this.props.goRecord.size * y + x;
        const stoneColor = this.props.goRecord.boardStates[this.props.editorState.currentBoardState].stones[coord];
        if (stoneColor === 'white' || stoneColor === 'black') {
          this.renderStone(ctx, style, x, y, stoneColor, 1);
        }
      }
    }
  }

  private renderStone(ctx: CanvasRenderingContext2D, style: DerivedRenderStyle, x: number, y: number, color: Color, opacity: number) {
    if (!this.blackStoneImage.loaded || !this.whiteStoneImage.loaded) {
      return;
    }
    const coordX = style.fullInset + (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
    const coordY = style.fullInset + (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;
    const radius = style.stoneSizePixels * 0.47;
    ctx.globalAlpha = opacity;
    let image: HTMLImageElement;
    if (color === 'white') {
      image = this.whiteStoneImage.element;
    } else {
      image = this.blackStoneImage.element;
    }
    ctx.save();
    ctx.shadowColor = '#333';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.drawImage(image, coordX - radius, coordY - radius, radius * 2, radius * 2);
    ctx.restore();
  }

  private renderHover(ctx: CanvasRenderingContext2D, style: DerivedRenderStyle) {
    if (!this.mouseCoordinates) {
      return;
    }
    
    const { mode } = this.props.editorState;
    if (mode === 'play' || mode === 'view' || mode === 'problem') {
      this.renderStone(ctx, style, this.mouseCoordinates.x, this.mouseCoordinates.y, this.props.editorState.playertoMove, 0.5);
    }
  }

  /////////////////////
  // Mouse Listeners //
  /////////////////////

  private onMouseOver = (ev: MouseEvent) => {
    const style = this.getDerivedRenderStyle(this.props);
    const x = Math.floor((ev.offsetX - style.fullInset) / style.stoneSizePixels) + style.finalClipRegion.left;
    const y = Math.floor((ev.offsetY - style.fullInset) / style.stoneSizePixels) + style.finalClipRegion.top;
    if (x >= style.finalClipRegion.left && x <= style.finalClipRegion.right
      && y >= style.finalClipRegion.top && y <= style.finalClipRegion.bottom) {
      this.mouseCoordinates = { x, y };
    } else {
      this.mouseCoordinates = undefined;
    }
      requestAnimationFrame(this.renderCanvas);
  }

  private onMouseUp = () => {
  }

  private onMouseOut = () => {
      this.mouseCoordinates = undefined;
      requestAnimationFrame(this.renderCanvas);
  }

  //////////////////
  // Render Style //
  //////////////////

  private getRenderStyle(props: BoardProps): RenderingProps {
    return Object.assign({}, defaultRenderingProps, props.renderingProps || {});
  }

  private getDerivedRenderStyle: (props: BoardProps) => DerivedRenderStyle = (props: BoardProps) => {
    const style = this.getRenderStyle(props);
    const fullInset = style.inset + (style.showCoordinates ? style.coordinateInset : 0);
    const clipRegion = style.clipRegion || { top: 0, bottom: props.goRecord.size - 1, left: 0, right: props.goRecord.size - 1 };
    const widthPixels = this.canvas.width;
    const heightPixels = this.canvas.height;
    const stoneSizePixels = style.fitToStoneSize || (widthPixels - fullInset * 2) / (clipRegion.right - clipRegion.left + 1);
    return {
      ...style,
      fullInset,
      finalClipRegion: clipRegion,
      widthPixels,
      heightPixels,
      stoneSizePixels,
    };
  };

  private computeCanvasSize() {
    const style = this.getRenderStyle(this.props);
    if (style.fitToStoneSize === undefined) {
      const finalClipRegion = style.clipRegion || { top: 0, bottom: this.props.goRecord.size - 1, left: 0, right: this.props.goRecord.size - 1 };
      const finalInset = style.inset + (style.showCoordinates ? style.coordinateInset : 0);
      const stoneSizeForWidth = (this.div.clientWidth - 2 * finalInset) / (finalClipRegion.right - finalClipRegion.left + 1);
      const heightForSize = 2 * finalInset + stoneSizeForWidth * (finalClipRegion.bottom - finalClipRegion.top + 1);
      if (heightForSize <= this.div.clientHeight) {
        this.canvasWidth = this.div.clientWidth;
        this.canvasHeight = heightForSize;
      } else {
        this.canvasHeight = this.div.clientHeight;
        const stoneSizeForHeight = (this.div.clientHeight - 2 * finalInset) / (finalClipRegion.bottom - finalClipRegion.top + 1);
        this.canvasWidth = 2 * finalInset + stoneSizeForHeight * (finalClipRegion.right - finalClipRegion.left + 1);
      }
    } else {
      this.canvasWidth = this.div.clientWidth;
      this.canvasHeight = this.div.clientHeight;
    }
  }
}