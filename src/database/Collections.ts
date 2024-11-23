import { createRefs } from "./createRefs";

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

export const CollectionsRef = createRefs<Collection>("collections", {
  authorId: "",
  id: "",
  description: "",
  name: "",
  problemIds: "",
});