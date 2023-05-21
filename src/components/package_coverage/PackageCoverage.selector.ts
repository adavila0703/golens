import { IAppReducerState } from '../../store/store'

export const repoDetailsDataSelector = (state: IAppReducerState) => state.repoDetailsState.data
export const fileCoverageSelector = (state: IAppReducerState) => state.repoDetailsState.fileCoverage
