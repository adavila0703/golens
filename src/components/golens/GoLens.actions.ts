import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { Endpoint, get, post } from '../../utils/api'
import { IDirectoryDetails } from './GoLens.reducer'

export const getTableDataLoading = createAction<string>(
  'GET_DATA_TABLE_LOADING'
)
export const getTableDataFailed = createAction<string>('GET_DATA_TABLE_FAILED')
export const getTableDataCompleted = createAction<any>(
  'GET_DATA_TABLE_COMPLETED'
)

export const getTableData = (): AppThunk => async (dispatch) => {
  get(Endpoint.GetDirectories).then((resp) =>
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
    post(body, Endpoint.CreateDirectory)
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
    post(body, Endpoint.GetRootDirectoryPaths)
      .then((resp) => {
        const paths: string[] = resp.paths
        const requests: number[] = []

        paths.forEach((path) => {
          post({ path }, Endpoint.CreateDirectory)
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
    post(body, Endpoint.DeleteDirectory).then(() => dispatch(getTableData()))
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
  console.log(data)
  data.forEach((d) => {
    ids.push(d.id)
  })
  dispatch(setSelectedIds(ids))
}
