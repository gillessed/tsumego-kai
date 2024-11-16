import {
  BreadcrumbProps,
  Breadcrumbs,
  Button,
  Intent,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Collection } from "../../database/Collections";
import { Problem } from "../../database/Problems";
import { GoRecord } from "../../goban/model/goban";
import { useSaveProblem } from "../../hooks/useSaveProblem";
import { AppRoutes } from "../AppRoutes";
import "./ProblemViewTitleRow.css";

interface Props {
  collection: Collection;
  problem: Problem;
  editing: boolean;
  isProblemOwner: boolean;
  record: GoRecord;
}

export const ProblemViewTitleRow = React.memo(
  ({ collection, problem, editing, isProblemOwner, record }: Props) => {
    const saveProblem = useSaveProblem();
    const navigate = useNavigate();
    const handleSave = React.useCallback(() => {
      const newProblem: Problem = {
        ...problem,
        record,
      };
      saveProblem(newProblem);
      navigate(AppRoutes.problem(problem.id));
    }, [problem, record, saveProblem, navigate]);

    const editProblem = React.useCallback(
      () => navigate(AppRoutes.problemEdit(problem.id)),
      [navigate, problem.id]
    );

    const problemIndex = React.useMemo(() => {
      return `#${collection.problemIds.indexOf(problem.id) + 1}`;
    }, [collection.problemIds, problem]);

    const breadcrumbs = React.useMemo((): BreadcrumbProps[] => {
      return [
        { href: AppRoutes.collections(), text: "Collections" },
        { href: AppRoutes.collection(collection.id), text: collection.name },
        { href: AppRoutes.problem(problem.id), text: problemIndex },
      ];
    }, [problem.id, collection.id, collection.name, problemIndex]);

    return (
      <div className="problem-view-title-row">
        <h2>
          <Breadcrumbs items={breadcrumbs} />
        </h2>
        <div>
          {editing && (
            <Button
              icon={IconNames.DOCUMENT}
              intent={Intent.PRIMARY}
              text="Save"
              onClick={handleSave}
            />
          )}
          {!editing && isProblemOwner && (
            <Button
              icon={IconNames.EDIT}
              intent={Intent.PRIMARY}
              text="Edit"
              onClick={editProblem}
            />
          )}
        </div>
      </div>
    );
  }
);
