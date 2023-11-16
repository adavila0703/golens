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
  CreateIgnored = 'api/ignored/CreateIgnored',
  GetIgnored = 'api/ignored/GetIgnored',
  DeleteIgnored = 'api/ignored/DeleteIgnored',
}
