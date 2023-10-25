import { createSelector } from 'reselect'
import { IAppReducerState } from '../../store/store'

export const dataSelector = (state: IAppReducerState) => state.goLensState.data

const isLoading = (state: IAppReducerState) => state.goLensState.loading

export const isLoadingSelector = createSelector(isLoading, (loading) => {
  return loading
})

export const getDataSelector = createSelector(dataSelector, (data) => data)
