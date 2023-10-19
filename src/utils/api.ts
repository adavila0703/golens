export enum GolensEndpoints {
  GetDirectories = 'api/directory/GetDirectories',
  CreateDirectory = 'api/directory/CreateDirectory',
  GetRootDirectoryPaths = 'api/directory/GetRootDirectoryPaths',
  DeleteDirectory = 'api/directory/DeleteDirectory',
  GetPackageCoverage = 'api/directory/GetPackageCoverage',
  GetFileCoverage = 'api/directory/GetFileCoverage',
  GetHtmlContents = 'api/directory/GetHtmlContents',
  UpdateDirectory = 'api/directory/UpdateDirectory',
}

export enum SettingsEndpoints {
  GetTasks = 'api/settings/GetTasks',
  CreateTask = 'api/settings/CreateTask',
  CreateTasks = 'api/settings/CreateTasks',
}

export const post = async (
  body: any,
  endpoint: GolensEndpoints | SettingsEndpoints
) => {
  const url = `${import.meta.env.VITE_HOST}:${
    import.meta.env.VITE_PORT
  }/${endpoint}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION,
      },
      body: JSON.stringify(body),
    })

    const responseBody = await response.json()
    return responseBody
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const get = async (endpoint: GolensEndpoints | SettingsEndpoints) => {
  const url = `${import.meta.env.VITE_HOST}:${
    import.meta.env.VITE_PORT
  }/${endpoint}`

  try {
    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION,
      },
    })

    const body = await resp.json()
    return body
  } catch (error) {
    console.log(error)
    throw error
  }
}
