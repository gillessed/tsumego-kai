import { hasMoveAtIntersection } from "../model/accessors";
import { Color, GoRecord, Intersection } from "../model/goban";
import { findReachableStates, getCurrentBoardState } from "../model/selectors";
import { DerivedRenderStyle } from "./BoardProps";
import { EditorState, shouldRenderNextMoves } from "./EditorState";
import { ImageAsset } from "./ImageAsset";

export interface GobanComponentContext {
  readonly c2d: CanvasRenderingContext2D;
  readonly boardImage: ImageAsset;
  readonly whiteStoneImage?: ImageAsset;
  readonly blackStoneImage?: ImageAsset;
  readonly style: DerivedRenderStyle;
  readonly record: GoRecord;
  readonly editorState: EditorState;
  readonly mouseCoordinates: { x: number, y: number } | null;
}

///////////
// Utils //
///////////


const getLetterCoordinate = (index: number): string => {
  if (index <= 8) {
    return String.fromCharCode(index + 65);
  } else if (index >= 8 && index <= 24) {
    return String.fromCharCode(index + 66);
  } else {
    return getLetterCoordinate(~~(index / 25) - 1) + getLetterCoordinate(index % 25)
  }
}

const clipped = (intersection: Intersection, style: DerivedRenderStyle) => {
  return (
    intersection.x < style.finalClipRegion.left
    || intersection.x > style.finalClipRegion.right
    || intersection.y < style.finalClipRegion.top
    || intersection.y > style.finalClipRegion.bottom
  );
}

///////////////////////
// Primary Renderers //
///////////////////////

export const renderCanvasComponents = (ctx: GobanComponentContext) => {
  const { c2d, style } = ctx;
  const { canvasSize } = style;

  c2d.clearRect(0, 0, canvasSize.width, canvasSize.width);

  renderBoard(ctx);
  renderLines(ctx);
  renderStarPoints(ctx);
  renderCoordinates(ctx);
  renderStones(ctx);
  renderNextMoves(ctx);
  renderHover(ctx);
  renderMarkups(ctx);
  renderLastMoveMarkup(ctx);
}

const renderBoard = (ctx: GobanComponentContext) => {
  const { c2d, boardImage, style } = ctx;
  const { canvasSize } = style;
  const pattern = c2d.createPattern(boardImage.element, 'repeat');
  if (pattern != null) {
    c2d.globalAlpha = 1;
    c2d.fillStyle = pattern;
    c2d.fillRect(0, 0, canvasSize.width, canvasSize.height);
  }
}

const renderLines = (ctx: GobanComponentContext) => {
  const { c2d, style, record } = ctx;
  const { fullInset, finalClipRegion, stoneSizePixels, lineColor, canvasSize } = style;
  const { width, height } = canvasSize;
  const horizontalLineStart = fullInset + (finalClipRegion.left === 0 ? stoneSizePixels / 2 : 0);
  const horizontalLineEnd = width - fullInset - (finalClipRegion.right === record.size - 1 ? stoneSizePixels / 2 : 0);
  const verticalLineStart = fullInset + (finalClipRegion.top === 0 ? stoneSizePixels / 2 : 0);
  const verticalLineEnd = height - fullInset - (finalClipRegion.bottom === record.size - 1 ? stoneSizePixels / 2 : 0);

  c2d.globalAlpha = 1;
  c2d.strokeStyle = lineColor;
  c2d.lineWidth = 1;
  c2d.beginPath();
  for (let i = finalClipRegion.top; i <= finalClipRegion.bottom; i++) {
    const offset = fullInset + stoneSizePixels * (i - finalClipRegion.top + 0.5);
    c2d.moveTo(horizontalLineStart, offset);
    c2d.lineTo(horizontalLineEnd, offset);
  }
  for (let i = finalClipRegion.left; i <= finalClipRegion.right; i++) {
    const offset = fullInset + stoneSizePixels * (i - finalClipRegion.left + 0.5);
    c2d.moveTo(offset, verticalLineStart);
    c2d.lineTo(offset, verticalLineEnd);
  }
  c2d.stroke();
}

const renderStarPoints = (ctx: GobanComponentContext) => {
  const { c2d, style, record } = ctx;
  const { lineColor, fullInset, finalClipRegion, stoneSizePixels } = style;
  c2d.fillStyle = lineColor;
  c2d.globalAlpha = 1;
  const size = record.size;
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
      const screengridx = point[0] - finalClipRegion.left;
      const screengridy = point[1] - finalClipRegion.top;
      const x = fullInset + (screengridx + 0.5) * stoneSizePixels;
      const y = fullInset + (screengridy + 0.5) * stoneSizePixels;
      if (point[0] >= finalClipRegion.left && point[0] <= finalClipRegion.right
        && point[1] >= finalClipRegion.top && point[1] <= finalClipRegion.bottom) {
        c2d.beginPath();
        c2d.arc(x, y, 3, 0, 3.1415 * 2);
        c2d.fill();
      }
    }
  }
}

const renderCoordinates = (ctx: GobanComponentContext) => {
  const { c2d, style } = ctx;
  const { inset, fullInset, finalClipRegion, stoneSizePixels, coordinateInset, showCoordinates, canvasSize, coordinateFontSize, font } = style;
  const { width, height } = canvasSize;
  if (!showCoordinates) {
    return false;
  }
  const top = inset + coordinateInset / 2;
  const bottom = height - inset - coordinateInset / 2;
  const left = inset + coordinateInset / 2;
  const right = width - inset - coordinateInset / 2;

  c2d.fillStyle = '#000000';
  c2d.font = `bold ${coordinateFontSize}px ${font}`;
  c2d.globalAlpha = 1;
  c2d.textAlign = 'center';
  c2d.textBaseline = 'middle';
  for (let i = finalClipRegion.top; i <= finalClipRegion.bottom; i++) {
    c2d.fillText(`${i + 1}`, left, fullInset + (i - finalClipRegion.top + 0.5) * stoneSizePixels);
    c2d.fillText(`${i + 1}`, right, fullInset + (i - finalClipRegion.top + 0.5) * stoneSizePixels);
  }

  for (let i = finalClipRegion.left; i <= finalClipRegion.right; i++) {
    c2d.fillText(getLetterCoordinate(i), fullInset + (i - finalClipRegion.left + 0.5) * stoneSizePixels, top);
    c2d.fillText(getLetterCoordinate(i), fullInset + (i - finalClipRegion.left + 0.5) * stoneSizePixels, bottom);
  }
}

const renderStones = (ctx: GobanComponentContext) => {
  const { style, record, editorState } = ctx;
  for (let x = style.finalClipRegion.left; x <= style.finalClipRegion.right; x++) {
    for (let y = style.finalClipRegion.top; y <= style.finalClipRegion.bottom; y++) {
      const coord = record.size * y + x;
      const stoneColor = record.boardStates[editorState.currentBoardState].stones[coord];
      if (stoneColor === 'white' || stoneColor === 'black') {
        renderStone(ctx, x, y, stoneColor, 1);
      }
    }
  }
}

const renderMarkups = (ctx: GobanComponentContext) => {
  const { style, record, editorState } = ctx;
  const currentBoardstate = record.boardStates[editorState.currentBoardState];
  let letterIndex = 0;
  for (const markup of currentBoardstate.markups) {
    const { intersection } = markup;
    if (clipped(intersection, style)) {
      continue;
    }
    if (hasMoveAtIntersection(currentBoardstate, intersection.x, intersection.y)
      && shouldRenderNextMoves(editorState.mode)) {
      continue;
    }
    const state = currentBoardstate.stones[intersection.y * record.size + intersection.x];
    let color: Color = state === 'black' ? 'white' : 'black';
    let letter: string | undefined;
    if (markup.type === 'letter') {
      letter = String.fromCharCode(letterIndex + 97);
      letterIndex++;
    }
    renderShapeAnnotation(ctx, intersection.x, intersection.y, color, 1, markup.type, letter);
  }
}

const renderNextMoves = (ctx: GobanComponentContext) => {
  const { c2d, style, record, editorState } = ctx;
  if (!shouldRenderNextMoves(editorState.mode)) {
    return false;
  }
  const currentBoardstate = record.boardStates[editorState.currentBoardState];
  const movesToDraw = currentBoardstate.moves.filter((move) => !clipped(move.intersection, style));
  for (const nextMove of movesToDraw) {
    const { intersection } = nextMove;
    if (currentBoardstate.stones[intersection.y * record.size + intersection.x] !== 'empty') {
      throw new Error('We gonna have problem. There is a move where there is a stone.');
    }

    const { x, y } = intersection;
    const coordX = style.fullInset + (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
    const coordY = style.fullInset + (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;

    let gradient = c2d.createRadialGradient(coordX, coordY, 1, coordX, coordY, 20);
    gradient.addColorStop(0, '#FFFFFFCC');
    gradient.addColorStop(1, '#FFFFFF00');
    c2d.fillStyle = gradient;
    c2d.arc(coordX, coordY, 30, 0, 3.14159 * 2);
    c2d.fill();
  }
  let index = 0;
  const mode = editorState.mode;
  for (const nextMove of movesToDraw) {
    index++;
    const { intersection } = nextMove;
    const { x, y } = intersection;

    const coordX = style.fullInset + (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
    const coordY = style.fullInset + (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;

    const letter = `${index}`;
    c2d.lineWidth = 0.8;
    c2d.font = `bold ${style.stoneSizePixels}px ${style.font}`;
    c2d.textAlign = 'center';
    c2d.textBaseline = 'middle';
    if (mode === 'edit' || mode === 'solution') {
      const nextBoardState = record.boardStates[nextMove.nextState];
      const reachableStates = [...findReachableStates(record, nextBoardState.id)];
      const correctState = reachableStates
        .map((stateId) => record.boardStates[stateId])
        .find((state) => !!state.correct);
      if (correctState) {
        c2d.fillStyle = '#00CC22';
      } else {
        c2d.fillStyle = '#FF0000';
      }
    } else {
      c2d.fillStyle = '#0066FF';
    }
    c2d.fillText(letter, coordX, coordY);
  }
}

const renderHover = (ctx: GobanComponentContext) => {
  const { record, editorState, mouseCoordinates } = ctx;
  if (!mouseCoordinates) {
    return;
  }
  const coordinates = mouseCoordinates;

  const { action } = editorState;
  const boardState = getCurrentBoardState(record, editorState);
  const state = boardState.stones[coordinates.y * record.size + coordinates.x];
  if (action === 'play') {
    if (state === 'empty') {
      renderStone(ctx, coordinates.x, coordinates.y, boardState.playerToPlay, 0.5);
    }
  } else if (action === 'triangle') {
    const color = state === 'black' ? 'white' : 'black';
    renderShapeAnnotation(ctx, coordinates.x, coordinates.y, color, 0.5, 'triangle');
  } else if (action === 'square') {
    const color = state === 'black' ? 'white' : 'black';
    renderShapeAnnotation(ctx, coordinates.x, coordinates.y, color, 0.5, 'square');
  } else if (action === 'letter') {
    const color = state === 'black' ? 'white' : 'black';
    renderShapeAnnotation(ctx, coordinates.x, coordinates.y, color, 0.5, 'letter', 'A');

  } else if (action === 'erase') {
    const existingMarkup = boardState.markups.find((markup) => markup.intersection.x === coordinates.x && markup.intersection.y === coordinates.y);
    if (existingMarkup) {
      const color = state === 'black' ? 'white' : 'black';
      renderShapeAnnotation(ctx, coordinates.x, coordinates.y, color, 0.5, 'cross');
    }
  } else if (action === 'delete') {
    const existingMove = boardState.moves.find((move) => move.intersection.x === coordinates.x && move.intersection.y === coordinates.y);
    renderShapeAnnotation(ctx, coordinates.x, coordinates.y, 'black', existingMove ? 0.7 : 0.25, 'cross');
  } else if (action === 'place-white') {
    const existingMove = boardState.moves.find((move) => move.intersection.x === coordinates.x && move.intersection.y === coordinates.y);
    if (!existingMove) {
      renderStone(ctx, coordinates.x, coordinates.y, 'white', 0.5);
    }
  } else if (action === 'place-black') {
    const existingMove = boardState.moves.find((move) => move.intersection.x === coordinates.x && move.intersection.y === coordinates.y);
    if (!existingMove) {
      renderStone(ctx, coordinates.x, coordinates.y, 'black', 0.5);
    }
  }
}

const renderLastMoveMarkup = (ctx: GobanComponentContext) => {
  const { style, record, editorState } = ctx;
  const numberOfMoves = editorState.moveStack.length;
  if (editorState.moveStack.length === 0) {
    return;
  }
  console.log(record, editorState);
  const lastMoveId = editorState.moveStack[numberOfMoves - 1];
  const currentBoardstate = record.boardStates[editorState.currentBoardState];
  const previousBoardstate = record.boardStates[currentBoardstate.reverseMoves[lastMoveId].previousState];
  const lastMove = previousBoardstate.moves.find((move) => move.id === lastMoveId);
  if (!lastMove) {
    return;
  }
  const stone = currentBoardstate.stones[lastMove.intersection.y * record.size + lastMove.intersection.x];
  if (stone === 'empty') {
    return;
  }
  if (clipped(lastMove.intersection, style)) {
    return;
  }
  const color = stone === 'black' ? 'white' : 'black';
  renderShapeAnnotation(ctx, lastMove.intersection.x, lastMove.intersection.y, color, 1, 'circle');
}

////////////////////////////
// Intersection Renderers //
////////////////////////////

const renderStone = (ctx: GobanComponentContext, x: number, y: number, color: Color, opacity: number) => {
  const { c2d, blackStoneImage, whiteStoneImage, style } = ctx;
  if (!blackStoneImage?.loaded || !whiteStoneImage?.loaded) {
    return;
  }
  const coordX = style.fullInset + (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
  const coordY = style.fullInset + (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;
  const radius = style.stoneSizePixels * 0.47;
  c2d.globalAlpha = opacity;
  let image: HTMLImageElement;
  if (color === 'white') {
    image = whiteStoneImage.element;
  } else {
    image = blackStoneImage.element;
  }
  if (opacity === 1) {
    c2d.shadowBlur = 2;
    c2d.shadowColor = '#444444';
    c2d.shadowOffsetX = 1;
    c2d.shadowOffsetY = 1;
  }
  c2d.drawImage(image, coordX - radius, coordY - radius, radius * 2, radius * 2);
  c2d.shadowBlur = 0;
  c2d.shadowOffsetX = 0;
  c2d.shadowOffsetY = 0;
}

const renderShapeAnnotation = (ctx: GobanComponentContext, x: number, y: number, color: Color, opacity: number, type: string, letter?: string) => {
  const { c2d, style } = ctx;
  const coordX = style.fullInset + (x + 0.5 - style.finalClipRegion.left) * style.stoneSizePixels;
  const coordY = style.fullInset + (y + 0.5 - style.finalClipRegion.top) * style.stoneSizePixels;
  c2d.globalAlpha = opacity;
  c2d.lineWidth = 2;
  if (color === 'white') {
    c2d.strokeStyle = '#FFFFFF';
  } else {
    c2d.strokeStyle = '#000000';
  }
  if (type === 'triangle') {
    renderTriangle(c2d, coordX, coordY, style.stoneSizePixels * 0.35);
  } else if (type === 'square') {
    renderSquare(c2d, coordX, coordY, style.stoneSizePixels * 0.26);
  } else if (type === 'circle') {
    renderCircle(c2d, coordX, coordY, style.stoneSizePixels * 0.3);
  } else if (type === 'letter' && letter) {
    if (color === 'white') {
      c2d.strokeStyle = '#000000';
      c2d.fillStyle = '#FFFFFF';
    } else {
      c2d.strokeStyle = '#FFFFFF';
      c2d.fillStyle = '#000000';
    }
    renderLetter(c2d, coordX, coordY, `bold ${24}px ${style.font}`, letter);
  } else if (type === 'cross') {
    renderCross(c2d, coordX, coordY, style.stoneSizePixels * 0.35);
  }
}

const renderTriangle = (c2d: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c2d.beginPath();
  c2d.moveTo(x, y - r);
  c2d.lineTo(x + r / 1.22, y + r / 1.58);
  c2d.lineTo(x - r / 1.22, y + r / 1.58);
  c2d.closePath();
  c2d.stroke();
}

const renderCircle = (c2d: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c2d.beginPath();
  c2d.arc(x, y, r, 0, 3.1415 * 2);
  c2d.stroke();
}

const renderSquare = (c2d: CanvasRenderingContext2D, x: number, y: number, r: number) => {
  c2d.beginPath();
  c2d.moveTo(x - r, y - r);
  c2d.lineTo(x + r, y - r);
  c2d.lineTo(x + r, y + r);
  c2d.lineTo(x - r, y + r);
  c2d.closePath();
  c2d.stroke();
}

const renderCross = (c2d: CanvasRenderingContext2D, x: number, y: number, r: number) => {
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
}

const renderLetter = (c2d: CanvasRenderingContext2D, x: number, y: number, font: string, letter: string) => {
  c2d.lineWidth = 0.8;
  c2d.font = font;
  c2d.textAlign = 'center';
  c2d.textBaseline = 'middle';
  c2d.fillText(letter, x, y);
  c2d.strokeText(letter, x, y);
}
