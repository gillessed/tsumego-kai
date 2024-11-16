import { getCurrentBoardState } from "../../model/selectors";
import { GobanComponentContext } from "./render";
import { renderShapeAnnotation } from "./renderShapeAnnotation";
import { renderStone } from "./renderStone";

export const renderHover = (ctx: GobanComponentContext) => {
  const { record, editorState, mouseCoordinates } = ctx;
  if (!mouseCoordinates) {
    return;
  }
  const coordinates = mouseCoordinates;

  const { action } = editorState;
  const boardState = getCurrentBoardState(record, editorState);
  const state = boardState.stones[coordinates.y * record.size + coordinates.x];
  if (action === "play") {
    if (state === "empty") {
      renderStone(
        ctx,
        coordinates.x,
        coordinates.y,
        boardState.playerToPlay,
        0.5
      );
    }
  } else if (action === "triangle") {
    const color = state === "black" ? "white" : "black";
    renderShapeAnnotation(
      ctx,
      coordinates.x,
      coordinates.y,
      color,
      0.5,
      "triangle"
    );
  } else if (action === "square") {
    const color = state === "black" ? "white" : "black";
    renderShapeAnnotation(
      ctx,
      coordinates.x,
      coordinates.y,
      color,
      0.5,
      "square"
    );
  } else if (action === "letter") {
    const color = state === "black" ? "white" : "black";
    renderShapeAnnotation(
      ctx,
      coordinates.x,
      coordinates.y,
      color,
      0.5,
      "letter",
      "A"
    );
  } else if (action === "erase") {
    const existingMarkup = boardState.markups.find(
      (markup) =>
        markup.intersection.x === coordinates.x &&
        markup.intersection.y === coordinates.y
    );
    if (existingMarkup) {
      const color = state === "black" ? "white" : "black";
      renderShapeAnnotation(
        ctx,
        coordinates.x,
        coordinates.y,
        color,
        0.5,
        "cross"
      );
    }
  } else if (action === "delete") {
    const existingMove = boardState.moves.find(
      (move) =>
        move.intersection.x === coordinates.x &&
        move.intersection.y === coordinates.y
    );
    renderShapeAnnotation(
      ctx,
      coordinates.x,
      coordinates.y,
      "black",
      existingMove ? 0.7 : 0.25,
      "cross"
    );
  } else if (action === "place-white") {
    const existingMove = boardState.moves.find(
      (move) =>
        move.intersection.x === coordinates.x &&
        move.intersection.y === coordinates.y
    );
    if (!existingMove) {
      renderStone(ctx, coordinates.x, coordinates.y, "white", 0.5);
    }
  } else if (action === "place-black") {
    const existingMove = boardState.moves.find(
      (move) =>
        move.intersection.x === coordinates.x &&
        move.intersection.y === coordinates.y
    );
    if (!existingMove) {
      renderStone(ctx, coordinates.x, coordinates.y, "black", 0.5);
    }
  }
};
