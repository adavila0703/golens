import { createReducer } from '@reduxjs/toolkit'
import { getIgnoredCompleted, deleteIgnoredCompleted } from './Ignored.actions'

export interface IIgnoredState {
  ignored: any[]
}

export const getInitialIgnoredState = (): IIgnoredState => {
  return {
    ignored: [],
  }
}

export const ignoredReducer = createReducer(
  getInitialIgnoredState(),
  (builder) => {
    builder
      .addCase(getIgnoredCompleted, (state, { payload }) => {
        state.ignored = payload
      })
      .addCase(deleteIgnoredCompleted, (state, { payload }) => {
        const newIgnoredDirectories = state.ignored.filter(
          (directory) => directory.ID !== payload
        )

        state.ignored = newIgnoredDirectories
      })
  }
)
