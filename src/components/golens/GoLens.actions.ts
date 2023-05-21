import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { Endpoint, get, post } from '../../utils/api'

export const getTableDataLoading = createAction<string>('GET_DATA_TABLE_LOADING')
export const getTableDataFailed = createAction<string>('GET_DATA_TABLE_FAILED')
export const getTableDataCompleted = createAction<any>('GET_DATA_TABLE_COMPLETED')

export const getTableData = (): AppThunk => async (dispatch) => {
  get(Endpoint.GetDirectories).then((resp) => dispatch(getTableDataCompleted(resp.directories)))
}

export const createDirectoryLoading = createAction<string>('GET_DATA_TABLE_LOADING')
export const createDirectoryFailed = createAction<string>('GET_DATA_TABLE_FAILED')
export const createDirectoryCompleted = createAction<any>('GET_DATA_TABLE_COMPLETED')

export const createDirectory =
  (path: string): AppThunk =>
  async (dispatch) => {
    const body = {
      path: path,
    }
    post(body, Endpoint.CreateDirectory).then(() => dispatch(getTableData()))
  }

export const sortById = createAction('SORT_BY_ID')
export const sortByName = createAction('SORT_BY_NAME')
export const sortByCoverage = createAction('SORT_BY_COVERAGE')
