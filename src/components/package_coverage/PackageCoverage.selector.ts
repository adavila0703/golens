import { IAppReducerState } from '../../store/store'

export const repoDetailsDataSelector = (state: IAppReducerState) => state.repoDetailsState.data
