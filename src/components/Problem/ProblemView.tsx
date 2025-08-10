import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import { User } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Problem } from '../../database/Problems';
import { EditorMode, EditorState } from '../../goban/component/types/EditorState';
import { RenderingProps } from '../../goban/component/types/RenderingProps';
import { useCollection } from '../../hooks/useCollection';
import { isAsyncLoaded, isAsyncLoading } from '../../utils/Async';
import { AppRoutes } from '../AppRoutes';
import { FullGoban } from '../FullGoban/FullGoban';
import './ProblemView.css';
import { ProblemViewTitleRow } from './ProblemViewTitleRow';

export interface ProblemViewProps {
  problem: Problem;
  user: User;
  editing: boolean;
}

const boardState = (mode: EditorMode, currentBoardState: string): EditorState => ({
  mode,
  action: 'play',
  moveStack: [],
  currentBoardState,
});

export const ProblemView = React.memo(({
  problem,
  editing,
  user,
}: ProblemViewProps) => {
  const navigate = useNavigate();
  const collection = useCollection(problem.collectionId);
  const [record, setRecord] = useState(problem.record);
  const [editorState, setEditorState] = useState<EditorState>(boardState(editing ? 'edit' : 'problem', problem.record.initialBoardState));
  const [renderingProps, setRenderingProps] = useState<Partial<RenderingProps>>({});

  const isProblemOwner = problem.authorId === user?.uid;
  if (!isProblemOwner) {
    navigate(AppRoutes.problem(problem.id));
  }

  return (
    <div className='problem-container'>
      {isAsyncLoaded(collection) && collection != null && <ProblemViewTitleRow
        collection={collection.value}
        editing={editing}
        isProblemOwner={isProblemOwner}
        record={record}
        problem={problem}
      />}
      {isAsyncLoading(collection) && <div className={classNames(Classes.SKELETON, 'problem-view-title-row')} />}
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
