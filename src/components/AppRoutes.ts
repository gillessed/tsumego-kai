const applicationPath = (path: string) => `/app/${path}`;

export const AppRoutes = {
  home: () => applicationPath('home'),
  login: () => applicationPath('login'),
  collections: () => applicationPath('collections'),
  collectionRoute: () => applicationPath('collection/:id'),
  collection: (id: string) => applicationPath(`collection/${id}`),
  problemRoute: () => applicationPath('tsumego/:id'),
  problem: (id: string) => applicationPath(`tsumego/${id}`),
  solve: () => applicationPath('solve'),
  signup: () => applicationPath('signup'),
  settings: () => applicationPath('settings'),
  profileRoute: () => applicationPath('user/:id'),
  profile: (id: string) => applicationPath(`user/${id}`),
};
