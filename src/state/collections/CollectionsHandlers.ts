import firebase from 'firebase';
import { Collection, NewCollection, NewProblem, Problem } from "./CollectionsTypes";

const CollectionsRef = 'collections';
const CollectionRefById = (id: string) => `${CollectionsRef}/${id}`;
const CollectionProblemIdRef = (id: string) => `${CollectionsRef}/${id}/problemIds`;
const ProblemsRef = 'problems';
const ProblemRefById = (id: string) => `${ProblemsRef}/${id}`;

const addNewCollection = async (newCollection: NewCollection): Promise<string> => {
  const collectionId = await firebase.database().ref(CollectionsRef).push().key;
  if (collectionId) {
    const collection: Collection = { ...newCollection, id: collectionId };
    await firebase.database().ref(CollectionRefById(collectionId)).set(collection);
    return collectionId;
  } else {
    throw Error('Could not create new collection id');
  }
}

const addNewProblem = async (newProblem: NewProblem): Promise<string> => {
  const problemId = await firebase.database().ref(ProblemsRef).push().key;
  if (problemId) {
    const problem: Problem = { ...newProblem, id: problemId };
    await firebase.database().ref(ProblemRefById(problemId)).set(problem);
    const collectionProblemIds = firebase.database().ref(CollectionProblemIdRef(newProblem.collectionId));
    const snapshot = await collectionProblemIds.once('value');
    const currentProblemIds: string[] = snapshot.val() ?? [];
    currentProblemIds.push(problemId);
    await collectionProblemIds.set(currentProblemIds);
    return problemId;
  } else {
    throw Error('Could not create new collection id');
  }
}

const getCollectionsForUser = async (userId: string): Promise<Collection[]> => {
  const snapshot = await firebase.database().ref(CollectionsRef).orderByChild('authorId').equalTo(userId).once('value');
  const collections: Collection[] = [];
  snapshot.forEach((childSnapshot) => {
    const collection: Collection = childSnapshot.val();
    collections.push({
      ...collection,
      problemIds: collection.problemIds ?? [],
    });
  });
  return collections;
}

const getCollectionById = async (collectionId: string): Promise<Collection> => {
  const collection: Collection = await firebase.database().ref(CollectionRefById(collectionId)).once('value').then((snapshot) => snapshot.val());
  if (collection.problemIds == null) {
    collection.problemIds = [];
  }
  return collection;
}

const getProblemById = async (problemId: string): Promise<Problem> => {
  const problem: Problem = await firebase.database().ref(ProblemRefById(problemId)).once('value').then((snapshot) => snapshot.val());
  if (problem.tags == null) {
    problem.tags = [];
  }
  for (const boardStateId of Object.keys(problem.record.boardStates)) {
    const state = problem.record.boardStates[boardStateId];
    if (state.markups == null) {
      state.markups = [];
    }
    if (state.moves == null) {
      state.moves = [];
    }
    if (state.reverseMoves == null) {
      state.reverseMoves = {};
    }
  }
  return problem;
}

export const Collections = {
  addNewCollection,
  addNewProblem,
  getCollectionsForUser,
  getCollectionById,
  getProblemById,
};
