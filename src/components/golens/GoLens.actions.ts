/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { get, post } from '../../utils/api'
import { DirectoryEndpoints, IgnoredEndpoints } from '../../utils/endpoints'
import { IgnoreType } from '../../utils/utils'
import { removePackage } from '../package-coverage/PackageCoverage.actions'
import { removeFile } from '../file-coverage/FileCoverage.actions'

export const getTableDataCompleted = createAction<any>(
  'GET_DATA_TABLE_COMPLETED'
)

export const getTableData = (): AppThunk => async (dispatch) => {
  get(DirectoryEndpoints.GetDirectories).then((resp) =>
    dispatch(getTableDataCompleted(resp.directories))
  )
}

export const createDirectory =
  (path: string, enqueueSnackbar: any): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))

    post({ path }, DirectoryEndpoints.CreateDirectory)
      .then((resp) => {
        dispatch(createDirectoriesCompleted(resp.directory))
        enqueueSnackbar(`${resp.directory.coverageName} created.`)
      })
      .catch(() => {
        enqueueSnackbar(`${path} is not a go directory.`, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
          hideIconVariant: true,
        })
      })
      .finally(() => dispatch(tableLoading(false)))
  }

export const tableLoading = createAction<boolean>('TABLE_LOADING')

export const createDirectoriesCompleted = createAction<any>(
  'CREATE_DIRECTORIES_COMPLETED'
)

export const findAndCreateDirectories =
  (path: string, enqueueSnackbar: any): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))
    const body = {
      rootPath: path,
    }

    post(body, DirectoryEndpoints.GetRootDirectoryPaths)
      .then((resp) => {
        const paths: string[] = resp.paths
        const requests: any[] = []

        paths.forEach((path) => {
          requests.push({
            body: { path },
            endpoint: DirectoryEndpoints.CreateDirectory,
          })
        })

        Promise.all(
          requests.map((req) =>
            post(req.body, req.endpoint).then((resp) => {
              dispatch(createDirectoriesCompleted(resp.directory))
              enqueueSnackbar(`${resp.directory.coverageName} created.`)
            })
          )
        ).finally(() => dispatch(tableLoading(false)))
      })
      .catch(() => {
        dispatch(tableLoading(false))
        enqueueSnackbar(
          'Path is a go directory, do not select a go directory when selecting the multi directory option.',
          {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            hideIconVariant: true,
          }
        )
      })
  }

export const deleteDirectoryCompleted = createAction<any>(
  'GET_DATA_TABLE_COMPLETED'
)

export const deleteDirectory =
  (id: string): AppThunk =>
  async (dispatch) => {
    const body = {
      id,
    }

    // TODO: what happens if we dont get a 200 status
    post(body, DirectoryEndpoints.DeleteDirectory).finally(() => {
      dispatch(deleteSelectedIdsCompleted(id))
    })
  }

export const deleteSelectedIdsCompleted = createAction<string>(
  'DELETE_SELECTED_IDS_COMPLETED'
)

export const deleteSelectedIds =
  (selectedIds: string[]): AppThunk =>
  async (dispatch) => {
    selectedIds.forEach((id) => {
      post({ id }, DirectoryEndpoints.DeleteDirectory).finally(() => {
        dispatch(deleteSelectedIdsCompleted(id))
      })
    })
  }

export const updateDirectoryCompleted = createAction<any>(
  'UPDATE_DIRECTORY_COMPLETED'
)

export const updateDirectory =
  (id: string, enqueueSnackbar: any): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))
    post({ id }, DirectoryEndpoints.UpdateDirectory)
      .then((resp) => {
        dispatch(updateDirectoryCompleted(resp.directory))
        enqueueSnackbar(`${resp.directory.coverageName} updated.`)
      })
      .finally(() => dispatch(tableLoading(false)))
  }

export const updateDirectories =
  (selectedIds: string[], enqueueSnackbar: any): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))

    const requests: Promise<any>[] = []

    selectedIds.forEach((id) => {
      requests.push(
        post({ id }, DirectoryEndpoints.UpdateDirectory).then((resp) => {
          dispatch(updateDirectoryCompleted(resp.directory))
          enqueueSnackbar(`${resp.directory.coverageName} updated.`)
        })
      )
    })

    Promise.all(requests).finally(() => dispatch(tableLoading(false)))
  }

export const createIgnoredDirectory =
  (directoryId: string, name: string, ignoreType: IgnoreType): AppThunk =>
  async (dispatch) => {
    post(
      { directoryId, name, ignoreType },
      IgnoredEndpoints.CreateIgnored
    ).then(() => {
      switch (ignoreType) {
        case IgnoreType.PackageType:
          dispatch(removePackage(name))
          break

        case IgnoreType.FileType:
          dispatch(removeFile(name.split('/')[1]))
          break
      }
    })
  }

export const getGoProjectsCompleted = createAction<any>(
  'GET_GO_PROJECTS_COMPLETED'
)

export const getGoProjects =
  (
    rootPath: string,
    enqueueSnackbar: any,
    callback: (resp: {
      paths: {
        Path: string
        DirectoryName: string
      }[]
    }) => void
  ): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))
    const body = {
      rootPath,
    }

    post(body, DirectoryEndpoints.GetRootDirectoryPaths)
      .then((resp) => {
        callback(resp)
      })
      .catch(() => {
        dispatch(tableLoading(false))
        enqueueSnackbar(
          'Path is a go directory, do not select a go directory when selecting the multi directory option.',
          {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            hideIconVariant: true,
          }
        )
      })
  }

export const createDirectories =
  (paths: string[], enqueueSnackbar: any): AppThunk =>
  async (dispatch) => {
    const requests: any[] = []

    paths.forEach((path) => {
      requests.push({
        body: { path },
        endpoint: DirectoryEndpoints.CreateDirectory,
      })
    })

    Promise.all(
      requests.map((req) =>
        post(req.body, req.endpoint).then((resp) => {
          dispatch(createDirectoriesCompleted(resp.directory))
          enqueueSnackbar(`${resp.directory.coverageName} created.`)
        })
      )
    ).finally(() => dispatch(tableLoading(false)))
  }
