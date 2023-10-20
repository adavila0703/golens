export type GolensEndpoints =
  | DirectoryEndpoints
  | TasksEndpoints
  | IgnoreDirectoryEndpoints

export enum DirectoryEndpoints {
  GetDirectories = 'api/directory/GetDirectories',
  CreateDirectory = 'api/directory/CreateDirectory',
  GetRootDirectoryPaths = 'api/directory/GetRootDirectoryPaths',
  DeleteDirectory = 'api/directory/DeleteDirectory',
  GetPackageCoverage = 'api/directory/GetPackageCoverage',
  GetFileCoverage = 'api/directory/GetFileCoverage',
  GetHtmlContents = 'api/directory/GetHtmlContents',
  UpdateDirectory = 'api/directory/UpdateDirectory',
}

export enum TasksEndpoints {
  GetTasks = 'api/tasks/GetTasks',
  CreateTask = 'api/tasks/CreateTask',
  CreateTasks = 'api/tasks/CreateTasks',
}

export enum IgnoreDirectoryEndpoints {
  CreateIgnoredDirectory = 'api/ignore_directory/CreateIgnoredDirectory',
  GetIgnoredDirectories = 'api/ignore_directory/GetIgnoredDirectories',
  DeleteIgnoredDirectory = 'api/ignore_directory/DeleteIgnoredDirectory',
}
