import { createReducer } from '@reduxjs/toolkit'
import { getTableDataCompleted } from './GoLens.actions'

export interface IGoLensState {
  data: any[]
}

export const getInitialGoLensState = (): IGoLensState => {
  return {
    data: [],
  }
}

export const goLensReducer = createReducer(getInitialGoLensState(), (builder) => {
  builder.addCase(getTableDataCompleted, (state, { payload }) => {
    state.data = payload
  })
})
