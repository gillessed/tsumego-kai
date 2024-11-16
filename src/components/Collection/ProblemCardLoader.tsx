import { Classes } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { useProblem } from "../../hooks/useProblem";
import { ProblemCard, ProblemCardProps } from "./ProblemCard";
import "./ProblemCard.css";

export type ProblemCardLoaderProps = Omit<ProblemCardProps, "problem"> & {
  problemId: string;
};

export const ProblemCardLoader = React.memo(
  ({ problemId, collection }: ProblemCardLoaderProps) => {
    const problem = useProblem(problemId);

    const skeletonClasses = classNames(Classes.SKELETON, "goban-skeleton");

    if (problem.isLoading) {
      return (
        <div className="problem-card card">
          <div className={skeletonClasses} />
        </div>
      );
    } else if (problem.isFetched && problem.data != null) {
      return <ProblemCard collection={collection} problem={problem.data} />;
    } else {
      return (
        <div className="problem-card card">
          Cannot find problem with id {problemId}
        </div>
      );
    }
  }
);
