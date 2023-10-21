import { IAppReducerState } from '../../store/store'
import { IPackageData } from './PackageCoverage.reducer'

export const packagecoverageDataSelector = (
  state: IAppReducerState
): IPackageData[] => state.packageCoverageState.data
