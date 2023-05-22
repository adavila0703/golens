import { createReducer } from '@reduxjs/toolkit'
import { getHtmlContentCompleted } from './HtmlContent.actions'

export interface IHtmlContentState {
  content: string
  lineCount: number
}

export const getInitialHtmlContentState = (): IHtmlContentState => {
  return {
    content: '',
    lineCount: 0,
  }
}

export const htmlContentReducer = createReducer(getInitialHtmlContentState(), (builder) => {
  builder.addCase(getHtmlContentCompleted, (state, { payload }) => {
    state.content = payload.htmlContent
    state.lineCount = payload.lineCount
  })
})
