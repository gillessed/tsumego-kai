export function refPath(...components: string[]): string {
  let path = "";
  for (let i = 0; i < components.length; i++) {
    let component = components[i];
    component = component.startsWith("/") ? component.substring(1) : component;
    component = component.endsWith("/") ? component.substring(0, component.length - 1) : component;
    path += component;
    if (i < components.length - 1) {
      path += "/";
    }
  }
  return path;
}

export type ReferenceType<T> = {
  value: string,
  fields: {
    [Property in keyof T]: string;
  },
  byKey: (key: string) => string;
};

export function createRefs<T>(rootKey: string, fields: { [key in keyof T]: string }) {
  return {
    root: rootKey,
    byId: (id: string): ReferenceType<T> => {
      const value = refPath(rootKey, id);
      for (const key of Object.keys(fields)) {
        const typedKey = key as keyof T;
        fields[typedKey] = refPath(value, key);
      }
      const byKey = (key: string) => refPath(value, key);
      return { value, fields, byKey };
    },
  }
}
