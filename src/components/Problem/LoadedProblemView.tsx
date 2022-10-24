import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React, { useState } from 'react';
import { EditorMode, EditorState } from '../../goban/component/EditorState';
import { RenderingProps } from '../../goban/component/RenderingProps';
import { browserHistory } from '../../history';
import { useAsyncCollection } from '../../state/collections/CollectionsHooks';
import { Problem } from '../../state/collections/CollectionsTypes';
import { MaybeUser } from '../../state/session/User';
import { isAsyncLoaded } from '../../state/utils/Async';
import { AppRoutes } from '../AppRoutes';
import { FullGoban } from '../FullGoban/FullGoban';
import './LoadedProblemView.scss';
import { ProblemViewTitleRow } from './ProblemViewTitleRow';

interface Props {
  problem: Problem;
  user: MaybeUser;
  editing: boolean;
}

const boardState = (mode: EditorMode, currentBoardState: string): EditorState => ({
  mode,
  action: 'play',
  moveStack: [],
  currentBoardState,
});

export const LoadedProblemView = React.memo(({
  problem,
  editing,
  user,
}: Props) => {
  const collection = useAsyncCollection(problem.collectionId);
  const [record, setRecord] = useState(problem.record);
  const [editorState, setEditorState] = useState<EditorState>(boardState(editing ? 'edit' : 'problem', problem.record.initialBoardState));
  const [renderingProps, setRenderingProps] = useState<Partial<RenderingProps>>({});

  const isProblemOwner = problem.authorId === user?.uid;
  if (!isProblemOwner) {
    browserHistory.push(AppRoutes.problem(problem.id));
  }

  return (
    <div className='loaded-problem-container'>
      {isAsyncLoaded(collection) && <ProblemViewTitleRow
        collection={collection.value}
        editing={editing}
        isProblemOwner={isProblemOwner}
        record={record}
        problem={problem}
      />}
      {!isAsyncLoaded(collection) && <div className={classNames(Classes.SKELETON, 'title-row')} />}
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
