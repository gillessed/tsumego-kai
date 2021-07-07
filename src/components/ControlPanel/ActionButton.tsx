import * as React from 'react';
import { AnchorButton, IconName } from '@blueprintjs/core';
import { EditAction, EditorState } from '../../goban/component/EditorState';
import { useCallback } from 'react';

interface Props {
  className?: string;
  icon: IconName;
  editorState: EditorState;
  buttonAction: EditAction;
  setEditorState: (editorState: EditorState) => void;
}

export const ActionButton = React.memo(({
  className,
  icon,
  editorState,
  buttonAction,
  setEditorState,
}: Props) => {

  const onClick = useCallback(() => {
    const newEditorState = {
      ...editorState,
      action: buttonAction,
    };
    setEditorState(newEditorState);
  }, [editorState, buttonAction, setEditorState]);

  return (
    <AnchorButton
      className={className}
      icon={icon}
      active={editorState.action === buttonAction}
      onClick={onClick}
    />
  );
});
