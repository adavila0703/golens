import { createSelector } from '@reduxjs/toolkit'
import { IAppReducerState } from '../../store/store'

export const dataSelector = (state: IAppReducerState) => state.goLensState.data
export const isNameSortAscSelector = (state: IAppReducerState) =>
  state.goLensState.nameSortAsc
export const isCoverageSortAscSelector = (state: IAppReducerState) =>
  state.goLensState.coverageSortAsc
const isLoading = (state: IAppReducerState) => state.goLensState.loading

export const isLoadingSelector = createSelector(isLoading, (loading) => {
  return loading
})

export const getDataSelector = createSelector(dataSelector, (data) => data)

export const selectedIdsSelector = (state: IAppReducerState) =>
  state.goLensState.selectedIds
export const getSelectedIdsSelector = createSelector(
  selectedIdsSelector,
  (selectedIds) => selectedIds
)
export const isAllSelectedSelector = createSelector(
  dataSelector,
  selectedIdsSelector,
  (data, selectedIds) => {
    return data.length == selectedIds.length
  }
)
