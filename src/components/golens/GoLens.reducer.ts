import { createReducer } from '@reduxjs/toolkit'
import {
  getTableDataCompleted,
  tableLoading,
  createDirectoriesCompleted,
  setSelectedIds,
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
  selectedIds: string[]
}

export const getInitialGoLensState = (): IGoLensState => {
  return {
    data: [],
    loading: false,
    selectedIds: [],
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
        if (!state.data) {
          state.data = [payload]
          return
        }
        state.data = [...state.data, payload]
      })
      .addCase(setSelectedIds, (state, { payload }) => {
        state.selectedIds = payload
      })
      .addCase(deleteSelectedIdsCompleted, (state, { payload }) => {
        const newData = state.data.filter((data) => data.id != payload)
        const newSelectedIds = state.selectedIds.filter((id) => id != payload)
        state.data = newData
        state.selectedIds = newSelectedIds
      })
      .addCase(updateDirectoryCompleted, (state, { payload }) => {
        const newData = state.data.map((data) => {
          if (data.id === payload.id) {
            data.coverageName = payload.coverageName
          }
          return data
        })

        const newSelectedIds = state.selectedIds.filter(
          (id) => id != payload.id
        )
        state.data = newData
        state.selectedIds = newSelectedIds
      })
  }
)
