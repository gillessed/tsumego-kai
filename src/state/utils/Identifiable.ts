export interface WithId {
  id: string;
}

export interface Identifiable<T extends WithId> {
  byId: { [key: string]: T };
  all: string[];
}

const add = <T extends WithId>(state: Identifiable<T>, object: T): Identifiable<T> => {
  const { id } = object;
  if (state.byId[id] != null) {
    return state;
  }
  const newAll = [...state.all, id];
  const newById = {
    ...state.byId,
    [id]: object,
  };
  return { byId: newById, all: newAll };
};

const remove = <T extends WithId>(state: Identifiable<T>, object: T): Identifiable<T> => {
  const { id } = object;
  if (state.byId[id] == null) {
    return state;
  }
  const newAll = [...state.all];
  const idIndex = state.all.indexOf(id);
  newAll.splice(idIndex);
  const newById = { ...state.byId };
  delete newById[id];
  return { byId: newById, all: newAll };
}

const set = <T extends WithId, K extends keyof T>(state: Identifiable<T>, id: string, key: keyof T, value: T[K]): Identifiable<T> => {
  if (state.byId[id] == null) {
    return state;
  }
  const newObject = { ...state.byId[id], [key]: value };
  const newById = { ...state.byId, [id]: newObject };
  return { ...state, byId: newById };
};

export const Identifiables = {
  add,
  remove,
  set,
};
