import React from "react";
import { AppRoutes } from "../../components/AppRoutes";
import { browserHistory } from "../../history";
import { Async, asyncEmpty, loadAsyncEffect } from "../utils/Async";
import { Collections } from "./CollectionsDb";
import { Collection, emptyCollection, emptyProblem, Problem } from "./CollectionsTypes";

export const useAsyncCollections = (userId: string) => {
  const [collections, setCollections] = React.useState<Async<Collection[]>>(asyncEmpty);
  React.useEffect(() => loadAsyncEffect(setCollections, () => Collections.getCollectionsForUser(userId), true), [userId]);
  return collections;
}

export const useAsyncCollection = (collectionId: string) => {
  const [collection, setCollection] = React.useState<Async<Collection>>(asyncEmpty);
  React.useEffect(() => loadAsyncEffect(setCollection, () => Collections.getCollectionById(collectionId), true), [collectionId]);
  return collection;
}

export const useAsyncAddCollection = (userId: string): [() => void, Async<void>] => {
  const [loading, setLoading] = React.useState<Async<void>>(asyncEmpty);
  const handleNewCollection = React.useCallback(() => loadAsyncEffect(setLoading, async () => {
    const collectionId = await Collections.addNewCollection(emptyCollection(userId));
    if (collectionId != null) {
      browserHistory.push(AppRoutes.collection(collectionId));
    }
  }), [userId]);
  return [handleNewCollection, loading];
}

export const useAsyncProblem = (problemId: string) => {
  const [problem, setProblem] = React.useState<Async<Problem>>(asyncEmpty);
  React.useEffect(() => loadAsyncEffect(setProblem, () => Collections.getProblemById(problemId), true), [problemId]);
  return problem;
}

export const useAsyncAddProblem = (collectionId: string, userId: string): [() => void, Async<void>] => {
  const [loading, setLoading] = React.useState<Async<void>>(asyncEmpty);
  const handleNewTsumego = React.useCallback(() => loadAsyncEffect(setLoading, async () => {
    const problemId = await Collections.addNewProblem(emptyProblem(userId, collectionId));
    if (problemId != null) {
      browserHistory.push(AppRoutes.problemEdit(problemId));
    }
  }), [userId, collectionId]);
  return [handleNewTsumego, loading];
}
