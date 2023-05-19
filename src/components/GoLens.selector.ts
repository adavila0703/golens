import { IAppReducerState } from '../store/store'

export const dataSelector = (state: IAppReducerState) => state.goLensState.data
