import { IAppReducerState } from '../../store/store'
import { IPackageData } from './PackageCoverage.reducer'

export const packageCoverageDataSelector = (
  state: IAppReducerState
): IPackageData[] => state.packageCoverageState.data
