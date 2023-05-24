import { IAppReducerState } from '../../store/store'

export const htmlContentSelector = (state: IAppReducerState) =>
  state.htmlContentState.content
export const lineCountSelector = (state: IAppReducerState) =>
  state.htmlContentState.lineCount
