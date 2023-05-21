import { createReducer } from '@reduxjs/toolkit'
import { getHtmlContentCompleted } from './HtmlContent.actions'

export interface IHtmlContentState {
  content: string
}

export const getInitialHtmlContentState = (): IHtmlContentState => {
  return {
    content: '',
  }
}

export const htmlContentReducer = createReducer(getInitialHtmlContentState(), (builder) => {
  builder.addCase(getHtmlContentCompleted, (state, { payload }) => {
    state.content = payload
  })
})
