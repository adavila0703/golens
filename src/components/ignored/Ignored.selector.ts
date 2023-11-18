import { IAppReducerState } from '../../store/store'

export const ignoredSelector = (state: IAppReducerState) =>
  state.ignoredDirectoriesState.ignored
