import React, { useCallback, useEffect, useRef, useState } from "react";
import { playPrimary } from "../model/mutators";
import { BoardProps, DerivedRenderStyle } from "./BoardProps";
import { clickHandler } from "./clickHandler";
import { ImageAsset } from "./ImageAsset";
import { renderCanvasComponents } from "./render/render";
import { AnimationState, StoneAnimation } from "./types/AnimationState";
import { GobanComponentContext } from "./types/GobanComponentContext";
import { DefaultRenderingProps, RenderingProps } from "./types/RenderingProps";
import { useExternallyUpdatedRef } from "./useExternallyUpdatedRef";
import { FadeInTime, HoverOpacity } from "./Constants";

interface Props extends BoardProps {
  classNames?: string;
  width: number;
  height: number;
}

export const GobanCanvas = React.memo(
  ({
    classNames,
    width: widthProp,
    height: heightProp,
    record: recordProp,
    editorState: editorStateProp,
    renderingProps: renderingPropsProp,
    setRecord,
    setEditorState,
  }: Props) => {
    if (
      (setRecord != null && setEditorState == null) ||
      (setRecord == null && setEditorState != null)
    ) {
      throw Error("must set both setRecord and setEditorState, or neither");
    }

    const width = useExternallyUpdatedRef(widthProp);
    const height = useExternallyUpdatedRef(heightProp);
    const record = useExternallyUpdatedRef(recordProp);
    const editorState = useExternallyUpdatedRef(editorStateProp);
    const renderingProps = useExternallyUpdatedRef(renderingPropsProp);

    const animations = useRef<AnimationState>({ animations: new Set() });
    const mouseCoordinates = useRef<{ x: number; y: number } | null>(null);
    const boardImage = useRef<ImageAsset>();
    const whiteStoneImage = useRef<ImageAsset>();
    const blackStoneImage = useRef<ImageAsset>();
    const derivedStyle = useRef<DerivedRenderStyle>();
    const canvasRef = useRef<HTMLCanvasElement>();
    const lockedBoard = useRef<boolean>(false);

    const [canvasWidthState, setCanvasWidth] = useState(0);
    const [canvasHeightState, setCanvasHeight] = useState(0);

    const animatePlay = useCallback(
      (x: number, y: number, callback?: () => void) => {
        animations.current.animations.add({
          started: Date.now(),
          totalTime: FadeInTime,
          x,
          y,
          opacity: [HoverOpacity, 1],
          callback,
        });
      },
      [animations]
    );

    const setCanvasRef = React.useCallback(
      (element: HTMLCanvasElement) => {
        if (element == null || canvasRef.current != null) {
          return;
        }
        canvasRef.current = element;
        element.onmousemove = (ev: MouseEvent) => {
          if (
            editorState.current.mode === "view" ||
            derivedStyle.current == null
          ) {
            return;
          }
          const { fullInset, stoneSizePixels, finalClipRegion } =
            derivedStyle.current;
          const x =
            Math.floor((ev.offsetX - fullInset) / stoneSizePixels) +
            finalClipRegion.left;
          const y =
            Math.floor((ev.offsetY - fullInset) / stoneSizePixels) +
            finalClipRegion.top;
          if (
            x >= finalClipRegion.left &&
            x <= finalClipRegion.right &&
            y >= finalClipRegion.top &&
            y <= finalClipRegion.bottom
          ) {
            mouseCoordinates.current = { x, y };
          } else {
            mouseCoordinates.current = null;
          }
        };

        element.onmouseup = () => {
          if (mouseCoordinates.current == null || lockedBoard.current === true) {
            return;
          }
          const { x, y } = mouseCoordinates.current;
          const result = clickHandler(
            record.current,
            editorState.current,
            x,
            y
          );
          if (result == null) {
            return;
          }
          setRecord?.(result.record);
          setEditorState?.(result.editorState);
          if (editorState.current.mode === "problem" && result.playedMove) {
            lockedBoard.current = true;
            animatePlay(x, y, () => {
              const nextResult = playPrimary(result.record, result.editorState);
              if (nextResult) {
                setRecord?.(result.record);
                setEditorState?.(nextResult.editorState);
                if (nextResult.move != null) {
                  animatePlay(
                    nextResult.move.intersection.x,
                    nextResult.move.intersection.y,
                    () => {
                      lockedBoard.current = false;
                    }
                  );
                }
              }
            });
          } else {
            animatePlay(x, y);
          }
        };

        element.onmouseout = () => {
          mouseCoordinates.current = null;
        };
      },
      [
        canvasRef,
        derivedStyle,
        editorState,
        record,
        animatePlay,
        setEditorState,
        setRecord,
      ]
    );

    useEffect(() => {
      function renderCanvas() {
        const internalRenderingProps: RenderingProps = {
          ...DefaultRenderingProps,
          ...renderingProps.current,
        };

        const { clipRegion, size } = record.current;
        const { inset, showCoordinates, coordinateInset } =
          internalRenderingProps;
        const finalClipRegion = clipRegion ?? {
          top: 0,
          bottom: size - 1,
          left: 0,
          right: size - 1,
        };
        const fullInset = inset + (showCoordinates ? coordinateInset : 0);
        const stoneSizeForWidth =
          (width.current - 2 * fullInset) /
          (finalClipRegion.right - finalClipRegion.left + 1);
        const stoneSizeForHeight =
          (height.current - 2 * fullInset) /
          (finalClipRegion.bottom - finalClipRegion.top + 1);
        const stoneSize = Math.min(stoneSizeForWidth, stoneSizeForHeight);
        const canvasWidth =
          2 * fullInset +
          stoneSize * (finalClipRegion.right - finalClipRegion.left + 1);
        const canvasHeight =
          2 * fullInset +
          stoneSize * (finalClipRegion.bottom - finalClipRegion.top + 1);
        derivedStyle.current = {
          ...internalRenderingProps,
          canvasSize: { width: canvasWidth, height: canvasHeight },
          fullInset,
          finalClipRegion,
          stoneSizePixels: stoneSize,
        };
        setCanvasWidth(canvasWidth);
        setCanvasHeight(canvasHeight);
        if (boardImage.current == null) {
          boardImage.current = new ImageAsset(
            internalRenderingProps.boardImagePath,
            () => {}
          );
        }
        if (whiteStoneImage.current == null) {
          whiteStoneImage.current = new ImageAsset(
            internalRenderingProps.whiteStoneImagePath,
            () => {}
          );
        }
        if (blackStoneImage.current == null) {
          blackStoneImage.current = new ImageAsset(
            internalRenderingProps.blackStoneImagePath,
            () => {}
          );
        }

        const c2d = canvasRef.current?.getContext("2d");
        if (!c2d || boardImage.current == null) {
          requestAnimationFrame(renderCanvas);
          return;
        }
        const timestamp = Date.now();
        const context: GobanComponentContext = {
          c2d,
          record: record.current,
          editorState: editorState.current,
          mouseCoordinates: mouseCoordinates.current,
          style: derivedStyle.current,
          boardImage: boardImage.current,
          whiteStoneImage: whiteStoneImage.current,
          blackStoneImage: blackStoneImage.current,
          animationState: animations.current,
          timestamp,
          lockedBoard: lockedBoard.current,
        };
        renderCanvasComponents(context);
        const finishedAnimations: StoneAnimation[] = [];
        const currentAnimations = new Set(animations.current.animations);
        for (const animation of currentAnimations) {
          if (timestamp > animation.started + animation.totalTime) {
            finishedAnimations.push(animation);
            currentAnimations.delete(animation);
          }
        }
        animations.current.animations = currentAnimations;
        for (const animation of finishedAnimations) {
          animation.callback?.();
        }
        requestAnimationFrame(renderCanvas);
      }

      requestAnimationFrame(renderCanvas);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className={classNames ?? ""}
      >
        <canvas
          ref={setCanvasRef}
          width={canvasWidthState}
          height={canvasHeightState}
        />
      </div>
    );
  }
);
