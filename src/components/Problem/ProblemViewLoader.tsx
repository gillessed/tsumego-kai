import { User } from "firebase/auth";
import React from "react";
import { useParams } from "react-router-dom";
import { useProblem } from "../../hooks/useProblem";
import { LoadingProblemView } from "./LoadingProblemView";
import { ProblemView } from "./ProblemView";
import "./ProblemViewLoader.css";

export interface ProblemViewLoaderProps {
  user: User;
  editing: boolean;
}

export const ProblemViewLoader = React.memo(
  ({ editing, user }: ProblemViewLoaderProps) => {
    const { id: problemId } = useParams();
    const problem = useProblem(problemId ?? "");

    if (problem.isLoading) {
      return (
        <div className="problem-loader-container">
          <LoadingProblemView />
        </div>
      );
    } else if (problem.isFetched && problem.data != null) {
      return (
        <div className="problem-loader-container">
          <ProblemView editing={editing} problem={problem.data} user={user} />
        </div>
      );
    } else {
      return (
        <div className="problem-loader-container">
          Could not find problem with id {problemId}
        </div>
      );
    }
  }
);
