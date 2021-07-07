import { Icon, TextArea } from '@blueprintjs/core';
import DotProp from 'dot-prop-immutable';
import * as React from 'react';
import { useCallback } from 'react';
import { EditorProps } from '../../goban/component/BoardProps';
import { readonlyText } from '../../goban/component/EditorState';
import { getCurrentBoardState } from '../../goban/model/selectors';
import { ActionButtonRow } from './ActionButtonRow';
import { ClipRow } from './ClipRow';
import './ControlPanel.scss';
import { FlagRow } from './FlagRow';
import { MoveButtonRow } from './MoveButtonRow';

export const ControlPanel = React.memo(({
  record,
  editorState,
  renderingProps,
  setRecord,
  setEditorState,
  setRenderingProps,
}: EditorProps) => {

  const onChangeText = useCallback((e: { target: { value: string } }) => {
    const state = editorState.currentBoardState;
    const newRecord = DotProp.set(record, `boardStates.${state}.text`, e.target.value);
    setRecord(newRecord);
  }, [record, setRecord, editorState.currentBoardState]);

  const boardState = getCurrentBoardState(record, editorState);
  const previousEnabled = editorState.moveStack.length > 0;
  const nextEnabled = boardState.moves.length > 0;
  const { mode } = editorState;
  const isTerminal = boardState.moves.length === 0;
  const correct = !isTerminal ? undefined : !!boardState.correct;
  return (
    <div className='control-panel-container'>
      <div className='header'>
        <h3 className='unselectable'>Move {editorState.moveStack.length}</h3>
        {correct === true && <Icon icon='tick' color='#1F7745' iconSize={32} />}
        {correct === false && <Icon icon='cross' color='#A82A2A' iconSize={32} />}
      </div>
      {mode !== 'problem' && <MoveButtonRow
        record={record}
        editorState={editorState}
        setEditorState={setEditorState}
        nextEnabled={nextEnabled}
        previousEnabled={previousEnabled}
      />}
      <ActionButtonRow
        editorState={editorState}
        setEditorState={setEditorState}
        mode={mode}
      />
      {mode === 'edit' && <FlagRow
        record={record}
        editorState={editorState}
        renderingProps={renderingProps}
        setRecord={setRecord}
        boardState={boardState}
      />}
      {mode === 'edit' && <ClipRow
        record={record}
        setRecord={setRecord}
      />}
      <TextArea
        className='comment-textarea'
        value={boardState.text}
        onChange={onChangeText}
        large={true}
        readOnly={readonlyText(mode)}
      />
    </div>
  );
});
