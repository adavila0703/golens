import { IAppReducerState } from '../../store/store'
import { IFileData } from './FileCoverage.reducer'

export const fileCoverageSelector = (state: IAppReducerState): IFileData[] =>
  state.fileCoverageState.fileCoverage
