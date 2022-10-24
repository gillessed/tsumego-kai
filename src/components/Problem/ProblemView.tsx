import React from 'react';
import { isAsyncLoaded } from '../../state/utils/Async';
import { useAsyncProblem } from '../../state/collections/CollectionsHooks';
import { LoadingView } from '../Loading/LoadingView';
import { LoadedProblemView } from './LoadedProblemView';
import './ProblemView.scss';
import { useSelector } from 'react-redux';
import { SessionSelectors } from '../../state/session/SessionReducer';

interface Props {
  problemId: string;
  editing: boolean;
}

export const ProblemView = React.memo(({
  problemId,
  editing,
}: Props) => {
  const problem = useAsyncProblem(problemId);
  const sessionState = useSelector(SessionSelectors.state);
  const { user } = sessionState;

  if (!isAsyncLoaded(problem) || !isAsyncLoaded(user)) {
    return <LoadingView type='content' />;
  }

  return (
    <div className='problem-container'>
      <LoadedProblemView
        editing={editing}
        problem={problem.value}
        user={user.value}
      />
    </div>
  );
});
