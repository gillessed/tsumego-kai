import React, { useEffect, useState } from "react";
import { AuthProps } from "../RequiredAuth/AuthProps";
import {
  Async,
  asyncEmpty,
  asyncLoaded,
  asyncLoading,
  isAsyncLoaded,
} from "../../utils/Async";
import { useAppContext } from "../../context/AppContext";
import { useGetRandomProblemId } from "../../hooks/useGetRandomProblemId";

export const SolveLoader = React.memo(({ user }: AuthProps) => {
  const { db: database } = useAppContext();
  const [problemId, setProblemId] = useState<Async<string>>(asyncEmpty);

  const getRandomProblemId = useGetRandomProblemId(user, database);

  useEffect(() => {
    async function handler() {
      setProblemId(asyncLoading);
      const problemId = await getRandomProblemId();
      setProblemId(asyncLoaded(`${problemId}`));
    }
    handler();
  }, [getRandomProblemId]);

  return (
    <div className="solve-loader-container">
      {user.uid}
      <br/>
      {isAsyncLoaded(problemId) && problemId.value}
    </div>
  );
});
