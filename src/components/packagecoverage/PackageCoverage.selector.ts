import { IAppReducerState } from '../../store/store'

export const packageDetailsDataSelector = (state: IAppReducerState) =>
  state.packageCoverageState.data
