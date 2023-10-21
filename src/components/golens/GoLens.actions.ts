/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { get, post } from '../../utils/api'
import { IDirectoryData, IGoLensState } from './GoLens.reducer'
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

export const createDirectoryCompleted = createAction<any>(
  'GET_DATA_TABLE_COMPLETED'
)

export const createDirectory =
  (path: string): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))
    const body = {
      path: path,
    }
    post(body, DirectoryEndpoints.CreateDirectory)
      .then(() => dispatch(getTableData()))
      .finally(() => dispatch(tableLoading(false)))
  }

export const tableLoading = createAction<boolean>('TABLE_LOADING')

export const createDirectoriesCompleted = createAction<any>(
  'CREATE_DIRECTORIES_COMPLETED'
)

export const createDirectories =
  (path: string): AppThunk =>
  async (dispatch) => {
    dispatch(tableLoading(true))
    const body = {
      rootPath: path,
    }

    post(body, DirectoryEndpoints.GetRootDirectoryPaths).then((resp) => {
      const paths: string[] = resp.paths
      const requests: Promise<any>[] = []

      paths.forEach((path) => {
        requests.push(
          post({ path }, DirectoryEndpoints.CreateDirectory).then((resp) => {
            dispatch(createDirectoriesCompleted(resp.directory))
          })
        )
      })

      Promise.all(requests).finally(() => dispatch(tableLoading(false)))
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

export const setSelectedIds = createAction<string[]>('SELECT_ID')
export const selectAllIds = (): AppThunk => async (dispatch, state) => {
  const { goLensState } = state()

  if (goLensState.data.length == goLensState.selectedIds.length) {
    dispatch(setSelectedIds([]))
    return
  }

  const data: IDirectoryData[] = goLensState.data
  const ids: string[] = []
  data.forEach((d) => {
    ids.push(d.id)
  })
  dispatch(setSelectedIds(ids))
}

export const deleteSelectedIdsCompleted = createAction<string>(
  'DELETE_SELECTED_IDS_COMPLETED'
)

export const deleteSelectedIds = (): AppThunk => async (dispatch, state) => {
  const goLensState = state().goLensState as IGoLensState

  goLensState.selectedIds.forEach((id) => {
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

export const updateDirectories = (): AppThunk => async (dispatch, state) => {
  const goLensState = state().goLensState as IGoLensState
  goLensState.selectedIds.forEach((id) => {
    dispatch(updateDirectory(id))
  })
}

export const createIgnoredDirectory =
  (directoryName: string): AppThunk =>
  async () => {
    post({ directoryName }, IgnoreDirectoryEndpoints.CreateIgnoredDirectory)
  }
