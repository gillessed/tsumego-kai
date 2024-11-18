import { ResizeEntry, ResizeSensor } from '@blueprintjs/core';
import React from 'react';
import { EditorProps } from '../../goban/component/BoardProps';
import { GobanCanvas } from '../../goban/component/GobanCanvas';
import { Dimension } from '../../goban/model/utils';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import './FullGoban.css';

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
  const [gobanSize, setGobanSize] = React.useState<Dimension>({ width: 0, height: 0 });

  const handleResize = React.useCallback((entries: ResizeEntry[]) => {
    if (entries.length === 0) {
      return;
    }
    const { width, height } = entries[0].contentRect;

    if (height - 2 * boardPanelMargin === 892) {
      return;
    }

    setGobanSize({
      width: width - rightPanelWidth - 2 * boardPanelMargin,
      height: height - 2 * boardPanelMargin,
    });
  }, [rightPanelWidth, boardPanelMargin]);

  return (
    <ResizeSensor onResize={handleResize}>
      <div className='full-goban-container effect-fade-in'>
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
    </ResizeSensor>
  );
}
