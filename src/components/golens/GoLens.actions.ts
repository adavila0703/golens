import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { DirectoryEndpoints, get, post } from '../../utils/api'
import { IDirectoryDetails, IGoLensState } from './GoLens.reducer'

export const getTableDataLoading = createAction<string>(
  'GET_DATA_TABLE_LOADING'
)
export const getTableDataFailed = createAction<string>('GET_DATA_TABLE_FAILED')
export const getTableDataCompleted = createAction<any>(
  'GET_DATA_TABLE_COMPLETED'
)

export const getTableData = (): AppThunk => async (dispatch) => {
  console.log('whassup')
  get(DirectoryEndpoints.GetDirectories).then((resp) =>
    dispatch(getTableDataCompleted(resp.directories))
  )
}

export const createDirectoryLoading = createAction<string>(
  'GET_DATA_TABLE_LOADING'
)
export const createDirectoryFailed = createAction<string>(
  'GET_DATA_TABLE_FAILED'
)
export const createDirectoryCompleted = createAction<any>(
  'GET_DATA_TABLE_COMPLETED'
)

export const createDirectory =
  (path: string): AppThunk =>
  async (dispatch) => {
    dispatch(createDirectoriesLoading(true))
    const body = {
      path: path,
    }
    post(body, DirectoryEndpoints.CreateDirectory)
      .then(() => dispatch(getTableData()))
      .finally(() => dispatch(createDirectoriesLoading(false)))
  }

export const sortByName = createAction('SORT_BY_NAME')
export const sortByCoverage = createAction('SORT_BY_COVERAGE')

export const createDirectoriesLoading = createAction<boolean>(
  'CREATE_DIRECTORIES_LOADING'
)
export const createDirectoriesFailed = createAction<string>(
  'CREATE_DIRECTORIES_FAILED'
)
export const createDirectoriesCompleted = createAction<any>(
  'CREATE_DIRECTORIES_COMPLETED'
)

export const createDirectories =
  (path: string): AppThunk =>
  async (dispatch) => {
    dispatch(createDirectoriesLoading(true))
    const body = {
      rootPath: path,
    }
    post(body, DirectoryEndpoints.GetRootDirectoryPaths)
      .then((resp) => {
        const paths: string[] = resp.paths
        const requests: number[] = []

        paths.forEach((path) => {
          post({ path }, DirectoryEndpoints.CreateDirectory)
            .then((resp) => {
              dispatch(createDirectoriesCompleted(resp.directory))
            })
            .finally(() => {
              requests.push(1)

              if (requests.length >= paths.length) {
                dispatch(createDirectoriesLoading(false))
              }
            })
        })
      })
      .finally()
  }

export const deleteDirectoryLoading = createAction<string>(
  'GET_DATA_TABLE_LOADING'
)
export const deleteDirectoryFailed = createAction<string>(
  'GET_DATA_TABLE_FAILED'
)
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

  const data: IDirectoryDetails[] = goLensState.data
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
    post({ id }, DirectoryEndpoints.UpdateDirectory).then((resp) => {
      console.log(resp.directory)
      dispatch(updateDirectoryCompleted(resp.directory))
    })
  }

export const updateDirectories = (): AppThunk => async (dispatch, state) => {
  const goLensState = state().goLensState as IGoLensState
  goLensState.selectedIds.forEach((id) => {
    dispatch(updateDirectory(id))
  })
}
