import { createReducer } from '@reduxjs/toolkit'
import {
  getTableDataCompleted,
  tableLoading,
  createDirectoriesCompleted,
  deleteSelectedIdsCompleted,
  updateDirectoryCompleted,
} from './GoLens.actions'

export interface IDirectoryData {
  totalLines: number
  coveredLines: number
  coverageName: string
  id: string
  path: string
}

export interface IGoLensState {
  data: IDirectoryData[]
  loading: boolean
}

export const getInitialGoLensState = (): IGoLensState => {
  return {
    data: [],
    loading: false,
  }
}

export const goLensReducer = createReducer(
  getInitialGoLensState(),
  (builder) => {
    builder
      .addCase(getTableDataCompleted, (state, { payload }) => {
        state.data = payload
      })
      .addCase(tableLoading, (state, { payload }) => {
        state.loading = payload
      })
      .addCase(createDirectoriesCompleted, (state, { payload }) => {
        state.data = [...state.data, payload]
      })
      .addCase(deleteSelectedIdsCompleted, (state, { payload }) => {
        const newData = state.data.filter((data) => data.id != payload)
        state.data = newData
      })
      .addCase(updateDirectoryCompleted, (state, { payload }) => {
        const newData = state.data.filter((data) => data.id !== payload.id)
        state.data = [...newData, payload]
      })
  }
)
