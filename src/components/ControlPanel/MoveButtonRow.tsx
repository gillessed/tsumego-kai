import { AnchorButton, ButtonGroup } from '@blueprintjs/core';
import React, { useCallback } from 'react';
import { EditorState } from '../../goban/component/types/EditorState';
import { GoRecord } from '../../goban/model/goban';
import { nextMove, previousMove } from '../../goban/model/mutators';
import './MoveButtonRow.css';

interface Props {
  record: GoRecord;
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  previousEnabled: boolean;
  nextEnabled: boolean;
}

export const MoveButtonRow = React.memo(({
  record,
  editorState,
  setEditorState,
  previousEnabled,
  nextEnabled,
}: Props) => {

  const onPreviousVariation = useCallback(() => {
    let newEditorState = previousMove(record, editorState);
    while (newEditorState.moveStack.length > 0
      && record.boardStates[newEditorState.currentBoardState].moves.length < 2) {
      newEditorState = previousMove(record, newEditorState);
    }
    setEditorState(newEditorState);
  }, [record, editorState, setEditorState]);

  const onPreviousMove = useCallback(() => {
    const newEditorState = previousMove(record, editorState);
    setEditorState(newEditorState);
  }, [record, editorState, setEditorState]);

  const onNextMove = useCallback(() => {
    const newEditorState = nextMove(record, editorState);
    setEditorState(newEditorState);
  }, [record, editorState, setEditorState]);

  const onNextVariation = useCallback(() => {
    let newEditorState = nextMove(record, editorState);
    while (record.boardStates[newEditorState.currentBoardState].moves.length === 1) {
      newEditorState = nextMove(record, newEditorState);
    }
    setEditorState(newEditorState);
  }, [record, editorState, setEditorState]);


  return (
    <ButtonGroup
      className='move-number-button-group'
      fill={true}
      large={false}
    >
      <AnchorButton
        icon='double-chevron-left'
        disabled={!previousEnabled}
        onClick={onPreviousVariation}
      />
      <AnchorButton
        icon='chevron-left'
        disabled={!previousEnabled}
        onClick={onPreviousMove}
      />
      <AnchorButton
        icon='chevron-right'
        disabled={!nextEnabled}
        onClick={onNextMove}
      />
      <AnchorButton
        icon='double-chevron-right'
        disabled={!nextEnabled}
        onClick={onNextVariation}
      />
    </ButtonGroup>
  );
})
