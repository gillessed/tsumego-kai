import { collection, doc, DocumentData, Firestore } from "firebase/firestore";

export interface Collection {
  id: string;
  problemIds: string[];
  authorId: string;
  name: string;
  description: string;
}

export type NewCollection = Omit<Collection, 'id'>;

export const emptyCollection = (userId: string): NewCollection => {
  return {
    problemIds: [],
    authorId: userId,
    name: 'New Collection',
    description: 'A new tsumego collection',
  };
};

export function loadSnapshotCollection(data: DocumentData | undefined) {
  const collectionData = data as Collection;
  if (collectionData.problemIds == null) {
    collectionData.problemIds = [];
  }
  return collectionData;
}

export const collectionCollection = (db: Firestore) => collection(db, "collections");

export const collectionDoc = (db: Firestore, id: string) => doc(collectionCollection(db), id);