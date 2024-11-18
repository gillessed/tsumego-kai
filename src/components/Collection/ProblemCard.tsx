import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Collection } from "../../database/Collections";
import { Problem } from "../../database/Problems";
import { EditorState } from "../../goban/component/types/EditorState";
import { GobanCanvas } from "../../goban/component/GobanCanvas";
import { RenderingProps } from "../../goban/component/types/RenderingProps";
import { AppRoutes } from "../AppRoutes";
import "./ProblemCard.css";

export interface ProblemCardProps {
  collection: Collection;
  problem: Problem;
}

const CardRenderingProps: Partial<RenderingProps> = {
  showCoordinates: false,
};

export const ProblemCard = React.memo(({
  problem,
  collection,
}: ProblemCardProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    const problemIndex = collection.problemIds.indexOf(problem.id);
    console.log(problemIndex);
    // do something here
    navigate(AppRoutes.problem(problem.id));
  }, [navigate, problem.id, collection.problemIds]);
  
  // const problem = useAsyncProblem(problemId); 

  const editorState: EditorState = React.useMemo(() => {
    return {
      mode: 'view',
      action: 'play',
      moveStack: [],
      currentBoardState: problem.record.initialBoardState,
    }
  }, [problem]);

  return (
    <div className='problem-card card' onClick={handleClick}>
      <GobanCanvas
        classNames='create-canvas-container'
        width={180}
        height={180}
        record={problem.record}
        editorState={editorState}
        renderingProps={CardRenderingProps}
      />
    </div>
  );
});
