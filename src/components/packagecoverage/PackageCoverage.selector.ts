import { IAppReducerState } from '../../store/store'
import { IPackageData } from './PackageCoverage.reducer'

export const packageDetailsDataSelector = (
  state: IAppReducerState
): IPackageData[] => state.packageCoverageState.data
