import React, { useCallback, useEffect, useRef, useState } from 'react';
import { EditorProps } from '../../goban/component/BoardProps';
import { GobanCanvas } from '../../goban/component/GobanCanvas';
import { Dimension } from '../../goban/model/utils';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import './FullGoban.scss';

const DefaultRightPanelWidth = 400;
const DefaultBoardPanelMargin = 20;

export interface Props extends EditorProps {
  rightPanelWidth?: number;
  boardPanelMargin?: number;
}

export const FullGoban = ({
  record,
  editorState,
  renderingProps,
  setRecord,
  setEditorState,
  setRenderingProps,
  rightPanelWidth = DefaultRightPanelWidth,
  boardPanelMargin = DefaultBoardPanelMargin,
}: Props) => {
  const divRef = useRef<HTMLDivElement>();
  const [gobanSize, setGobanSize] = useState<Dimension>({ width: 0, height: 0 });

  const updateGobanSize = useCallback(() => {
    if (divRef.current != null) {
      setGobanSize({
        width: divRef.current.clientWidth - rightPanelWidth - 2 * boardPanelMargin,
        height: divRef.current.clientHeight - 2 * boardPanelMargin,
      });
    }
  }, [divRef, rightPanelWidth, boardPanelMargin]);

  const setDivRef = useCallback((element: HTMLDivElement) => {
    if (element != null) {
      divRef.current = element;
      updateGobanSize();
    }
  }, [divRef, updateGobanSize]);

  useEffect(() => {
    const windowResizeListener = () => {
      const div = divRef.current
      if (div == null) {
        return;
      }
      updateGobanSize();
    };
    window.addEventListener('resize', windowResizeListener);

    return () => window.removeEventListener('resize', windowResizeListener);
  }, [divRef, updateGobanSize]);

  return (
    <div ref={setDivRef} className='full-goban-container effect-fade-in'>
      <div className='goban-container' style={{ padding: boardPanelMargin, flexGrow: 1 }}>
        <GobanCanvas
          classNames='full-goban-canvas-container'
          width={gobanSize.width}
          height={gobanSize.height}
          record={record}
          editorState={editorState}
          renderingProps={renderingProps}
          setRecord={setRecord}
          setEditorState={setEditorState}
        />
      </div>
      <div className='full-goban-right columm'>
        <ControlPanel
          record={record}
          editorState={editorState}
          renderingProps={renderingProps}
          setRecord={setRecord}
          setEditorState={setEditorState}
          setRenderingProps={setRenderingProps}
        />
      </div>
    </div>
  );
}
