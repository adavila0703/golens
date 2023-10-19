import { createReducer } from '@reduxjs/toolkit'
import {
  getTableDataCompleted,
  sortByName,
  sortByCoverage,
  tableLoading,
  tableLoading,
  setSelectedIds,
  deleteSelectedIdsCompleted,
  updateDirectoryCompleted,
} from './GoLens.actions'

export interface IDirectoryDetails {
  coverage: number
  coverageName: string
  id: string
  path: string
}

export interface IGoLensState {
  data: IDirectoryDetails[]
  nameSortAsc: boolean
  coverageSortAsc: boolean
  loading: boolean
  selectedIds: string[]
}

export const getInitialGoLensState = (): IGoLensState => {
  return {
    data: [],
    nameSortAsc: true,
    coverageSortAsc: true,
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
      .addCase(sortByName, (state) => {
        const sortedArray = Array.from(state.data)

        if (state.nameSortAsc) {
          sortedArray.sort((a, b) => {
            if (a.coverageName < b.coverageName) {
              return -1
            }

            if (a.coverageName > b.coverageName) {
              return 1
            }

            return 0
          })
          state.nameSortAsc = false
        } else {
          sortedArray.sort((a, b) => {
            if (a.coverageName > b.coverageName) {
              return -1
            }

            if (a.coverageName < b.coverageName) {
              return 1
            }

            return 0
          })
          state.nameSortAsc = true
        }

        state.data = sortedArray
      })
      .addCase(sortByCoverage, (state) => {
        const sortedArray = Array.from(state.data)

        if (state.coverageSortAsc) {
          sortedArray.sort((a, b) => b.coverage - a.coverage)
          state.coverageSortAsc = false
        } else {
          sortedArray.sort((a, b) => a.coverage - b.coverage)
          state.coverageSortAsc = true
        }

        state.data = sortedArray
      })
      .addCase(tableLoading, (state, { payload }) => {
        state.loading = payload
      })
      .addCase(tableLoading, (state, { payload }) => {
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
            data.coverage = payload.coverage
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
