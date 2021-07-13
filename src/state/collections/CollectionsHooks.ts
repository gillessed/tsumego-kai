import { useCallback, useEffect, useState } from "react";
import { AppRoutes } from "../../components/AppRoutes";
import { browserHistory } from "../../history";
import { Async, asyncEmpty, loadAsyncEffect } from "../Async";
import { Collections } from "./CollectionsHandlers";
import { Collection, emptyCollection, emptyProblem, Problem } from "./CollectionsTypes";

export const useAsyncCollections = (userId: string) => {
  const [collections, setCollections] = useState<Async<Collection[]>>(asyncEmpty);
  useEffect(() => loadAsyncEffect(setCollections, () => Collections.getCollectionsForUser(userId), true), [userId]);
  return collections;
}

export const useAsyncCollection = (collectionId: string) => {
  const [collection, setCollection] = useState<Async<Collection>>(asyncEmpty);
  useEffect(() => loadAsyncEffect(setCollection, () => Collections.getCollectionById(collectionId), true), [collectionId]);
  return collection;
}

export const useAsyncAddCollection = (userId: string): [() => void, Async<void>] => {
  const [loading, setLoading] = useState<Async<void>>(asyncEmpty);
  const handleNewCollection = useCallback(() => loadAsyncEffect(setLoading, async () => {
    const collectionId = await Collections.addNewCollection(emptyCollection(userId));
    if (collectionId != null) {
      browserHistory.push(AppRoutes.collection(collectionId));
    }
  }), [userId]);
  return [handleNewCollection, loading];
}

export const useAsyncProblem = (problemId: string) => {
  const [problem, setProblem] = useState<Async<Problem>>(asyncEmpty);
  useEffect(() => loadAsyncEffect(setProblem, () => Collections.getProblemById(problemId), true), [problemId]);
  return problem;
}

export const useAsyncAddProblem = (collectionId: string, userId: string): [() => void, Async<void>] => {
  const [loading, setLoading] = useState<Async<void>>(asyncEmpty);
  const handleNewTsumego = useCallback(() => loadAsyncEffect(setLoading, async () => {
    const problemId = await Collections.addNewProblem(emptyProblem(userId, collectionId));
    if (problemId != null) {
      browserHistory.push(AppRoutes.problem(problemId));
    }
  }), [userId, collectionId]);
  return [handleNewTsumego, loading];
}
