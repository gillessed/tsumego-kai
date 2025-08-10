import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { useProblem } from "../../hooks/useProblem";
import { isAsyncError, isAsyncLoaded, isAsyncLoading } from "../../utils/Async";
import { ProblemCard, ProblemCardProps } from "./ProblemCard";
import "./ProblemCard.css";

export type ProblemCardLoaderProps = Omit<ProblemCardProps, "problem"> & {
  problemId: string;
};

export const ProblemCardLoader = React.memo(
  ({ problemId, collection }: ProblemCardLoaderProps) => {
    const problem = useProblem(problemId);

    const skeletonClasses = classNames(Classes.SKELETON, "goban-skeleton");

    if (isAsyncLoading(problem)) {
      return (
        <div className="problem-card card">
          <div className={skeletonClasses} />
        </div>
      );
    } else if (isAsyncLoaded(problem)) {
      return <ProblemCard collection={collection} problem={problem.value} />;
    } else if (isAsyncError(problem)) {
      return (
        <div className="problem-card card">
          {problem.error}
        </div>
      );
    } else {
      return <div>WTF</div>;
    }
  }
);
