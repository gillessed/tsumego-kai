import { Classes } from "@blueprintjs/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { browserHistory } from "../../history";
import { Async, asyncEmpty, isAsyncLoaded, loadAsyncEffect } from "../../state/Async";
import { Collections } from "../../state/collections/CollectionsHandlers";
import { Problem } from "../../state/collections/CollectionsTypes";
import { AppRoutes } from "../AppRoutes";
import "./ProblemCard.scss";
import { GobanCanvas } from '../../goban/component/GobanCanvas';
import classNames from 'classnames';
import { EditorState } from "../../goban/component/EditorState";
import { RenderingProps } from "../../goban/component/RenderingProps";

interface Props {
  problemId: string;
}

const CardRenderingProps: Partial<RenderingProps> = {
  showCoordinates: false,
};

export const ProblemCard = React.memo(({
  problemId,
}: Props) => {

  const handleClick = useCallback(() => {
    browserHistory.push(AppRoutes.problem(problemId));
  }, [problemId]);
  
  const [problem, setProblem] = useState<Async<Problem>>(asyncEmpty);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadAsyncEffect(setProblem, () => Collections.getProblemById(problemId), true), [problemId]);

  const editorState: EditorState = useMemo(() => {
    return {
      mode: 'view',
      action: 'play',
      moveStack: [],
      currentBoardState: isAsyncLoaded(problem) ? problem.value.record.initialBoardState : '',
    }
  }, [problem]);

  const skeletonClasses = classNames(Classes.SKELETON, 'goban-skeleton');

  return (
    <div className='problem-card card' onClick={handleClick}>
      {!isAsyncLoaded(problem) && <div className={skeletonClasses} />}
      {isAsyncLoaded(problem) && <GobanCanvas
        classNames='create-canvas-container'
        width={180}
        height={180}
        record={problem.value.record}
        editorState={editorState}
        renderingProps={CardRenderingProps}
      />}
    </div>
  );
});
