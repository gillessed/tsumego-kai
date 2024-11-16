import { createRefs } from "./createRefs";

export interface Collection {
  id: string;
  problemIds: string[];
  authorId: string;
  dateCreated: string;
  lastUpdated: string;
  name: string;
  description: string;
}

export type NewCollection = Omit<Collection, 'id'>;

export const emptyCollection = (userId: string): NewCollection => {
  const date = Date.now().toString();
  return {
    problemIds: [],
    authorId: userId,
    dateCreated: date,
    lastUpdated: date,
    name: 'New Collection',
    description: 'A new tsumego collection',
  };
};

export const CollectionsRef = createRefs<Collection>("collections", {
  authorId: "",
  id: "",
  dateCreated: "",
  description: "",
  lastUpdated: "",
  name: "",
  problemIds: "",
});