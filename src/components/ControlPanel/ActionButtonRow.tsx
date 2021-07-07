import { ButtonGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { EditorMode, EditorState } from '../../goban/component/EditorState';
import { ActionButton } from './ActionButton';
import './ActionButtonRow.scss';

interface Props {
  editorState: EditorState;
  setEditorState: (editorState: EditorState) => void;
  mode: EditorMode;
}

export const ActionButtonRow = React.memo(({
  editorState,
  setEditorState,
  mode
}: Props) => {

  return (
    <ButtonGroup
      className='action-button-group'
      fill={true}
      large={false}
    >
      <ActionButton
        className='play-button'
        icon={IconNames.PLAY}
        buttonAction='play'
        editorState={editorState}
        setEditorState={setEditorState}
      />
      {mode === 'edit' && <ActionButton
        className='black-button'
        icon={IconNames.RECORD}
        buttonAction='place-black'
        editorState={editorState}
        setEditorState={setEditorState}
      />}
      {mode === 'edit' && <ActionButton
        className='white-button'
        icon={IconNames.RECORD}
        buttonAction='place-white'
        editorState={editorState}
        setEditorState={setEditorState}
      />}
      <ActionButton
        icon={IconNames.SYMBOL_TRIANGLE_UP}
        buttonAction='triangle'
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <ActionButton
        icon={IconNames.STOP}
        buttonAction='square'
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <ActionButton
        icon={IconNames.FONT}
        buttonAction='letter'
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <ActionButton
        icon={IconNames.ERASER}
        buttonAction='erase'
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <ActionButton
        icon={IconNames.TRASH}
        buttonAction='delete'
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </ButtonGroup>
  );
})
