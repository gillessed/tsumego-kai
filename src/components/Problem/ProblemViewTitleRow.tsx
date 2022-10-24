import { BreadcrumbProps, Breadcrumbs, Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { GoRecord } from "../../goban/model/goban";
import { browserHistory } from "../../history";
import { Collections } from "../../state/collections/CollectionsDb";
import { Collection, Problem } from "../../state/collections/CollectionsTypes";
import { AppRoutes } from "../AppRoutes";
import "./ProblemViewTitleRow.scss";

interface Props {
  collection: Collection;
  problem: Problem;
  editing: boolean;
  isProblemOwner: boolean;
  record: GoRecord;
}

export const ProblemViewTitleRow = React.memo(({
  collection,
  problem,
  editing,
  isProblemOwner,
  record,
}: Props) => {
  const saveProblem = React.useCallback(() => {
    const newProblem: Problem = {
      ...problem,
      record,
    }
    Collections.saveProblem(newProblem).then(() => {
      browserHistory.push(AppRoutes.problem(problem.id));
    });
  }, [problem, record]);

  const editProblem = React.useCallback(() => browserHistory.push(AppRoutes.problemEdit(problem.id)), [problem.id]);

  const problemIndex = React.useMemo(() => {
    return `#${collection.problemIds.indexOf(problem.id) + 1}`;
  }, [collection.problemIds, problem]);

  const breadcrumbs = React.useMemo((): BreadcrumbProps[] => {
    return [
      { href: AppRoutes.collections(), text: "Collections" },
      { href: AppRoutes.collection(collection.id), text: collection.name },
      { href: AppRoutes.problem(problem.id), text: problemIndex },
    ]
  }, [problem.id, collection.id, collection.name, problemIndex]);

  return (
    <div className='problem-view-title-row'>
      <h2><Breadcrumbs items={breadcrumbs} /></h2>
      <div>
        {editing && <Button
          icon={IconNames.DOCUMENT}
          intent={Intent.PRIMARY}
          text="Save"
          onClick={saveProblem}
        />}
        {!editing && isProblemOwner && <Button
          icon={IconNames.EDIT}
          intent={Intent.PRIMARY}
          text="Edit"
          onClick={editProblem}
        />}
      </div>
    </div>
  );
});
