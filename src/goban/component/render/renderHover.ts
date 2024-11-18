import { getCurrentBoardState } from "../../model/selectors";
import { GobanComponentContext } from "../types/GobanComponentContext";
import { HoverOpacity } from "../Constants";
import { renderShapeAnnotation } from "./renderShapeAnnotation";
import { renderStone } from "./renderStone";

export const renderHover = (ctx: GobanComponentContext) => {
  const { record, editorState, mouseCoordinates, lockedBoard } = ctx;
  if (!mouseCoordinates || lockedBoard === true) {
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
        HoverOpacity,
        false
      );
    }
  } else if (action === "triangle") {
    const color = state === "black" ? "white" : "black";
    renderShapeAnnotation(
      ctx,
      coordinates.x,
      coordinates.y,
      color,
      HoverOpacity,
      "triangle"
    );
  } else if (action === "square") {
    const color = state === "black" ? "white" : "black";
    renderShapeAnnotation(
      ctx,
      coordinates.x,
      coordinates.y,
      color,
      HoverOpacity,
      "square"
    );
  } else if (action === "letter") {
    const color = state === "black" ? "white" : "black";
    renderShapeAnnotation(
      ctx,
      coordinates.x,
      coordinates.y,
      color,
      HoverOpacity,
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
        HoverOpacity,
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
      renderStone(ctx, coordinates.x, coordinates.y, "white", HoverOpacity, false);
    }
  } else if (action === "place-black") {
    const existingMove = boardState.moves.find(
      (move) =>
        move.intersection.x === coordinates.x &&
        move.intersection.y === coordinates.y
    );
    if (!existingMove) {
      renderStone(ctx, coordinates.x, coordinates.y, "black", HoverOpacity, false);
    }
  }
};
