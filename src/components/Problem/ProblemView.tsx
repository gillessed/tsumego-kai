import React from 'react';
import { isAsyncLoaded } from '../../state/Async';
import { useAsyncProblem } from '../../state/collections/CollectionsHooks';
import { LoadingView } from '../Loading/LoadingView';
import { LoadedProblemView } from './LoadedProblemView';
import './ProblemView.scss';

interface Props {
  problemId: string;
}

export const ProblemView = React.memo(({
  problemId,
}: Props) => {
  const problem = useAsyncProblem(problemId);

  if (!isAsyncLoaded(problem)) {
    return <LoadingView type='content' />;
  }

  return (
    <div className='problem-container'>
      <LoadedProblemView problem={problem.value} />
    </div>
  );
});
