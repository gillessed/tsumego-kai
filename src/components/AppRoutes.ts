const applicationPath = (path: string) => `/app/${path}`;

export const AppRoutes = {
  home: () => applicationPath('home'),
  login: () => applicationPath('login'),
  collections: () => applicationPath('collections'),
  collectionRoute: applicationPath('collection/:id'),
  collection: (id: string) => applicationPath(`collection/${id}`),
  problemRoute: applicationPath('tsumego/view/:id'),
  problem: (id: string) => applicationPath(`tsumego/view/${id}`),
  problemEditRoute: applicationPath(`tsumego/edit/:id`),
  problemEdit: (id: string) => applicationPath(`tsumego/edit/${id}`),
  solve: () => applicationPath('solve'),
  signup: () => applicationPath('signup'),
  settings: () => applicationPath('settings'),
  profileRoute: () => applicationPath('user/:id'),
  profile: (id: string) => applicationPath(`user/${id}`),
};
