import { User } from "firebase/auth";
import React from "react";
import { useParams } from "react-router-dom";
import { useProblem } from "../../hooks/useProblem";
import { LoadingProblemView } from "./LoadingProblemView";
import { ProblemView } from "./ProblemView";
import "./ProblemViewLoader.css";
import { isAsyncError, isAsyncLoaded, isAsyncLoading } from "../../utils/Async";

export interface ProblemViewLoaderProps {
  user: User;
  editing: boolean;
}

export const ProblemViewLoader = React.memo(
  ({ editing, user }: ProblemViewLoaderProps) => {
    const { id: problemId } = useParams();
    const problem = useProblem(problemId ?? "");

    if (isAsyncLoading(problem)) {
      return (
        <div className="problem-loader-container">
          <LoadingProblemView />
        </div>
      );
    } else if (isAsyncLoaded(problem)) {
      return (
        <div className="problem-loader-container">
          <ProblemView editing={editing} problem={problem.value} user={user} />
        </div>
      );
    } else if (isAsyncError(problem)) {
      return <div className="problem-loader-container">{problem.error}</div>;
    }
  }
);
