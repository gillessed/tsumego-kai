import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { playPrimary } from '../model/mutators';
import { BoardProps, DerivedRenderStyle } from './BoardProps';
import { clickHandler } from './clickHandler';
import { GobanComponentContext, renderCanvasComponents } from './GobanCanvasComponents';
import { ImageAsset } from './ImageAsset';
import { DefaultRenderingProps } from './RenderingProps';


interface Props extends BoardProps {
  classNames?: string;
  width: number;
  height: number;
}

export const GobanCanvas = React.memo(({
  classNames,
  width,
  height,
  record,
  editorState,
  renderingProps,
  setRecord,
  setEditorState,
}: Props) => {

  if (
    (setRecord != null && setEditorState == null) ||
    (setRecord == null && setEditorState != null)
  ) {
    throw Error('must set both setRecord and setEditorState, or neither');
  }

  const mouseCoordinates = useRef<{ x: number, y: number } | null>(null);
  const boardImage = useRef<ImageAsset>();
  const whiteStoneImage = useRef<ImageAsset>();
  const blackStoneImage = useRef<ImageAsset>();
  const canvas = useRef<HTMLCanvasElement>();

  const internalRenderingProps = useMemo(() => ({ ...DefaultRenderingProps, ...renderingProps }), [renderingProps]);

  const derivedStyle = useMemo((): DerivedRenderStyle => {
    const { clipRegion, size } = record;
    const { inset, showCoordinates, coordinateInset } = internalRenderingProps;
    const finalClipRegion = clipRegion ?? { top: 0, bottom: size - 1, left: 0, right: size - 1 };
    const fullInset = inset + (showCoordinates ? coordinateInset : 0);
    const stoneSizeForWidth = (width - 2 * fullInset) / (finalClipRegion.right - finalClipRegion.left + 1);
    const stoneSizeForHeight = (height - 2 * fullInset) / (finalClipRegion.bottom - finalClipRegion.top + 1);
    const stoneSize = Math.min(stoneSizeForWidth, stoneSizeForHeight);
    const canvasWidth = 2 * fullInset + stoneSize * (finalClipRegion.right - finalClipRegion.left + 1);
    const canvasHeight = 2 * fullInset + stoneSize * (finalClipRegion.bottom - finalClipRegion.top + 1);
    return {
      ...internalRenderingProps,
      canvasSize: { width: canvasWidth, height: canvasHeight },
      fullInset,
      finalClipRegion,
      stoneSizePixels: stoneSize,
    };
  }, [internalRenderingProps, record, width, height]);

  /////////////////////
  // Canvas Renderer //
  /////////////////////

  const renderCanvas = useCallback(() => {
    if (canvas.current == null || !boardImage.current?.loaded) {
      return;
    }
    const c2d = canvas.current.getContext('2d');
    if (!c2d) {
      return;
    }
    const context: GobanComponentContext = {
      c2d,
      record,
      editorState,
      mouseCoordinates: mouseCoordinates.current,
      style: derivedStyle,
      boardImage: boardImage.current,
      whiteStoneImage: whiteStoneImage.current,
      blackStoneImage: blackStoneImage.current,
    }
    renderCanvasComponents(context);
  }, [canvas, mouseCoordinates, derivedStyle, boardImage, whiteStoneImage, blackStoneImage, record, editorState]);

  useEffect(() => renderCanvas(), [renderCanvas]);

  /////////////////////
  // Mouse Listeners //
  /////////////////////

  const handleMouseOver = useCallback((ev: MouseEvent) => {
    if (editorState.mode === 'view') {
      return;
    }
    const { fullInset, stoneSizePixels, finalClipRegion } = derivedStyle;
    const x = Math.floor((ev.offsetX - fullInset) / stoneSizePixels) + finalClipRegion.left;
    const y = Math.floor((ev.offsetY - fullInset) / stoneSizePixels) + finalClipRegion.top;
    if (x >= finalClipRegion.left && x <= finalClipRegion.right
      && y >= finalClipRegion.top && y <= finalClipRegion.bottom) {
      mouseCoordinates.current = { x, y };
    } else {
      mouseCoordinates.current = null;
    }
    requestAnimationFrame(renderCanvas);
  }, [renderCanvas, derivedStyle, editorState.mode]);

  const handleMouseUp = useCallback(() => {
    if (mouseCoordinates.current != null) {
      const { x, y } = mouseCoordinates.current;
      const result = clickHandler(record, editorState, x, y);
      if (result) {
        if (editorState.mode === 'problem' && result.playedMove) {
          const nextEditorState = playPrimary(result.record, result.editorState);
          if (nextEditorState) {
            setRecord?.(result.record);
            setEditorState?.(nextEditorState);
          }
        } else {
          setRecord?.(result.record);
          setEditorState?.(result.editorState);
        }
      }
    }
  }, [record, editorState, setRecord, setEditorState]);

  const handleMouseOut = useCallback(() => {
    mouseCoordinates.current = null;
    requestAnimationFrame(renderCanvas);
  }, [mouseCoordinates, renderCanvas]);

  //////////////////
  // Ref Handlers //
  //////////////////

  const setCanvasRef = useCallback((element: HTMLCanvasElement) => {
    if (element != null && canvas.current == null) {
      canvas.current = element;
      canvas.current.onmouseover = handleMouseOver;
      requestAnimationFrame(renderCanvas);
    }
  }, [canvas, handleMouseOver, renderCanvas]);

  ///////////////
  // Lifecycle //
  ///////////////

  useEffect(() => {
    boardImage.current = new ImageAsset(internalRenderingProps.boardImagePath, () => requestAnimationFrame(renderCanvas));
    whiteStoneImage.current = new ImageAsset(internalRenderingProps.whiteStoneImagePath, () => requestAnimationFrame(renderCanvas));
    blackStoneImage.current = new ImageAsset(internalRenderingProps.blackStoneImagePath, () => requestAnimationFrame(renderCanvas));
    const windowResizeListener = () => {
      if (canvas.current != null) {
        canvas.current.width = derivedStyle.canvasSize.width;
        canvas.current.height = derivedStyle.canvasSize.height;
      }
      requestAnimationFrame(renderCanvas);
    };
    window.addEventListener('resize', windowResizeListener);

    return () => {
      window.removeEventListener('resize', windowResizeListener);
    }
  });

  useEffect(() => {
    canvas.current?.addEventListener('mousemove', handleMouseOver);
    return () => canvas.current?.removeEventListener('mousemove', handleMouseOver);
  }, [handleMouseOver]);

  useEffect(() => {
    canvas.current?.addEventListener('mouseup', handleMouseUp);
    return () => canvas.current?.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  useEffect(() => {
    canvas.current?.addEventListener('mouseout', handleMouseOut);
    return () => canvas.current?.removeEventListener('mouseout', handleMouseOut);
  }, [handleMouseOut]);

  //////////////////////////
  // Render html elements //
  //////////////////////////

  const { canvasSize } = derivedStyle;
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center' }}
      className={classNames ?? ''}
    >
      <canvas ref={setCanvasRef} width={canvasSize.width} height={canvasSize.height} />
    </div>
  );

})
