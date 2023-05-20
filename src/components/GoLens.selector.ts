import { IAppReducerState } from '../store/store'

export const dataSelector = (state: IAppReducerState) => state.goLensState.data
export const isIdSortAscSelector = (state: IAppReducerState) => state.goLensState.idSortAsc
export const isNameSortAscSelector = (state: IAppReducerState) => state.goLensState.nameSortAsc
export const isCoverageSortAscSelector = (state: IAppReducerState) => state.goLensState.coverageSortAsc
