import { IAppReducerState } from '../../store/store'

export const fileCoverageSelector = (state: IAppReducerState) => state.fileCoverageState.fileCoverage
