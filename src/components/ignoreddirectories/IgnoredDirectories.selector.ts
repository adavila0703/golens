import { IAppReducerState } from '../../store/store'

export const ignoredDirectoriesSelector = (state: IAppReducerState) =>
  state.ignoredDirectoriesState.ignoredDirectories
