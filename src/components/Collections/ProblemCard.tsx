import { Classes } from "@blueprintjs/core";
import classNames from 'classnames';
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { EditorState } from "../../goban/component/EditorState";
import { GobanCanvas } from '../../goban/component/GobanCanvas';
import { RenderingProps } from "../../goban/component/RenderingProps";
import { browserHistory } from "../../history";
import { isAsyncLoaded } from "../../state/Async";
import { useAsyncProblem } from "../../state/collections/CollectionsHooks";
import { Collection } from "../../state/collections/CollectionsTypes";
import { SolveActions } from "../../state/solve/SolveActions";
import { AppRoutes } from "../AppRoutes";
import "./ProblemCard.scss";

interface Props {
  collection: Collection;
  problemId: string;
}

const CardRenderingProps: Partial<RenderingProps> = {
  showCoordinates: false,
};

export const ProblemCard = React.memo(({
  problemId,
  collection,
}: Props) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    const problemIndex = collection.problemIds.indexOf(problemId);
    dispatch(SolveActions.setProblemSet({
      problemIds: collection.problemIds,
      currentProblemIndex: problemIndex,
    }));
    browserHistory.push(AppRoutes.problem(problemId));
  }, [problemId, dispatch]);
  
  const problem = useAsyncProblem(problemId); 

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
