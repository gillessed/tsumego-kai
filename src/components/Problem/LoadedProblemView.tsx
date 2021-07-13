import React, { useState } from 'react';
import { EditorState } from '../../goban/component/EditorState';
import { RenderingProps } from '../../goban/component/RenderingProps';
import { Problem } from '../../state/collections/CollectionsTypes';
import { FullGoban } from '../FullGoban/FullGoban';
import './LoadedProblemView.scss';

interface Props {
  problem: Problem;
}

export const LoadedProblemView = React.memo(({
  problem,
}: Props) => {
  const [record, setRecord] = useState(problem.record);
  const [editorState, setEditorState] = useState<EditorState>({
    mode: 'problem',
    action: 'play',
    moveStack: [],
    currentBoardState: problem.record.initialBoardState,
  });
  const [renderingProps, setRenderingProps] = useState<Partial<RenderingProps>>({});

  return (
    <div className='loaded-problem-container'>
      <div className='title-row'>
        <div>Igo Hatsuyoron</div>
        <div>#543</div>
      </div>
      <FullGoban
        record={record}
        editorState={editorState}
        renderingProps={renderingProps}
        setRecord={setRecord}
        setEditorState={setEditorState}
        setRenderingProps={setRenderingProps}
      />
    </div>
  );
});
