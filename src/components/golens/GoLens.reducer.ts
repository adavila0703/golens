import { createReducer } from '@reduxjs/toolkit'
import {
  getTableDataCompleted,
  sortById,
  sortByName,
  sortByCoverage,
  createDirectoriesLoading,
  createDirectoriesCompleted,
} from './GoLens.actions'

export interface IGoLensState {
  data: any[]
  idSortAsc: boolean
  nameSortAsc: boolean
  coverageSortAsc: boolean
  loading: boolean
}

export const getInitialGoLensState = (): IGoLensState => {
  return {
    data: [],
    idSortAsc: true,
    nameSortAsc: true,
    coverageSortAsc: true,
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
      .addCase(sortById, (state) => {
        const sortedArray = Array.from(state.data)

        if (state.idSortAsc) {
          sortedArray.sort((a, b) => b.item - a.item)
          state.idSortAsc = false
        } else {
          sortedArray.sort((a, b) => a.item - b.item)
          state.idSortAsc = true
        }

        state.data = sortedArray
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
      .addCase(createDirectoriesLoading, (state, { payload }) => {
        state.loading = payload
      })
      .addCase(createDirectoriesCompleted, (state, { payload }) => {
        state.data = [...state.data, payload]
      })
  }
)
