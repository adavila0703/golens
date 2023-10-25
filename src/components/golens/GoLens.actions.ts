/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { get, post } from '../../utils/api'
import { IGoLensState } from './GoLens.reducer'
import {
  DirectoryEndpoints,
  IgnoreDirectoryEndpoints,
} from '../../utils/endpoints'

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
      .finally(() => dispatch(tableLoading(false)))
  }

export const tableLoading = createAction<boolean>('TABLE_LOADING')

export const createDirectoriesCompleted = createAction<any>(
  'CREATE_DIRECTORIES_COMPLETED'
)

export const createDirectories =
  (path: string, enqueueSnackbar: any): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))
    const body = {
      rootPath: path,
    }

    post(body, DirectoryEndpoints.GetRootDirectoryPaths).then((resp) => {
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
  (id: string): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))
    post({ id }, DirectoryEndpoints.UpdateDirectory)
      .then((resp) => {
        dispatch(updateDirectoryCompleted(resp.directory))
      })
      .finally(() => dispatch(tableLoading(false)))
  }

export const updateDirectories =
  (selectedIds: string[], enqueueSnackbar: any): AppThunk =>
  async (dispatch, state) => {
    const goLensState: IGoLensState = state().goLensState

    selectedIds.forEach((id) => {
      post({ id }, DirectoryEndpoints.UpdateDirectory)
        .then((resp) => {
          dispatch(updateDirectoryCompleted(resp.directory))
        })
        .finally(() => {
          const directoryName = goLensState.data.find(
            (data) => data.id === id
          )?.coverageName

          enqueueSnackbar(`${directoryName} updated.`)
        })
    })
  }

export const createIgnoredDirectory =
  (directoryName: string): AppThunk =>
  async () => {
    post({ directoryName }, IgnoreDirectoryEndpoints.CreateIgnoredDirectory)
  }
