import firebase from 'firebase';
import { Collection, NewCollection, NewProblem, Problem } from "./CollectionsTypes";
import { createRefs } from "../utils/Firebase";

const CollectionsRef = createRefs<Collection>("collections", {
  authorId: "",
  id: "",
  dateCreated: "",
  description: "",
  lastUpdated: "",
  name: "",
  problemIds: "",
});
const ProblemsRef = createRefs<Problem>("problems", {
  id: "",
  authorId: "",
  collectionId: "",
  rank: "",
  record: "",
  tags: "",
});

const addNewCollection = async (newCollection: NewCollection): Promise<string> => {
  const collectionId = await firebase.database().ref(CollectionsRef.root).push().key;
  if (collectionId) {
    const collection: Collection = { ...newCollection, id: collectionId };
    await firebase.database().ref(CollectionsRef.byId(collectionId).value).set(collection);
    return collectionId;
  } else {
    throw Error('Could not create new collection id');
  }
}

const addNewProblem = async (newProblem: NewProblem): Promise<string> => {
  const problemId = await firebase.database().ref(ProblemsRef.root).push().key;
  if (problemId) {
    const problem: Problem = { ...newProblem, id: problemId };
    await firebase.database().ref(ProblemsRef.byId(problemId).value).set(problem);
    const collectionProblemIds = firebase.database().ref(CollectionsRef.byId(newProblem.collectionId).fields.problemIds);
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
  const snapshot = await firebase.database().ref(CollectionsRef.root).orderByChild('authorId').equalTo(userId).once('value');
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
  const collection: Collection = await firebase.database().ref(CollectionsRef.byId(collectionId).value).once('value').then((snapshot) => snapshot.val());
  if (collection.problemIds == null) {
    collection.problemIds = [];
  }
  return collection;
}

const getProblemById = async (problemId: string): Promise<Problem> => {
  const problem: Problem = await firebase.database().ref(ProblemsRef.byId(problemId).value).once('value').then((snapshot) => snapshot.val());
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

export const setName = async (collectionId: string, name: string) => {
  await firebase.database().ref(CollectionsRef.byId(collectionId).fields.name).set(name);
  await firebase.database().ref(CollectionsRef.byId(collectionId).fields.lastUpdated).set(Date.now().toString());
}

export const saveProblem = async (problem: Problem): Promise<void> => {
  await firebase.database().ref(ProblemsRef.byId(problem.id).value).set(problem);
}

export const Collections = {
  addNewCollection,
  addNewProblem,
  getCollectionsForUser,
  getCollectionById,
  getProblemById,
  setName,
  saveProblem,
};
