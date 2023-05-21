import { IAppReducerState } from '../../store/store'

export const htmlContentSelector = (state: IAppReducerState) => state.htmlContentState.content
