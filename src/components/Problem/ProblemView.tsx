import React, { useEffect, useState } from 'react';
import { Async, asyncEmpty, isAsyncLoaded, loadAsyncEffect } from '../../state/Async';
import { Collections } from '../../state/collections/CollectionsHandlers';
import { Problem } from '../../state/collections/CollectionsTypes';
import { LoadingView } from '../Loading/LoadingView';
import { LoadedProblemView } from './LoadedProblemView';
import './ProblemView.scss';

interface Props {
  problemId: string;
}

export const ProblemView = React.memo(({
  problemId,
}: Props) => {
  const [problem, setProblem] = useState<Async<Problem>>(asyncEmpty);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadAsyncEffect(setProblem, () => Collections.getProblemById(problemId), true), [problemId]);

  if (!isAsyncLoaded(problem)) {
    return <LoadingView type='content' />;
  }

  return (
    <div className='problem-container'>
      <LoadedProblemView problem={problem.value} />
    </div>
  );
});
