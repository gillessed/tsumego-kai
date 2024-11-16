import { User } from "firebase/auth";
import React from "react";
import { useProblem } from "../../hooks/useProblem";
import { LoadingView } from "../Loading/LoadingView";
import { ProblemView } from "./ProblemView";
import "./ProblemViewLoader.css";
import { useParams } from "react-router-dom";

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
        <div className="problem-container">
          <LoadingView type="content" />
        </div>
      );
    } else if (problem.isFetched && problem.data != null) {
      return (
        <div className="problem-container">
          <ProblemView editing={editing} problem={problem.data} user={user} />
        </div>
      );
    } else {
      return (
        <div className="problem-container">
          Could not find problem with id {problemId}
        </div>
      );
    }
  }
);
