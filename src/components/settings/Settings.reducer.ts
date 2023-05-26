import { createReducer } from '@reduxjs/toolkit'
import { getSettingsTasksCompleted } from './Settings.actions'

export interface ISettingsState {
  tasks: any
}

export const getInitialSettingsState = (): ISettingsState => {
  return {
    tasks: [],
  }
}

export const settingsReducer = createReducer(
  getInitialSettingsState(),
  (builder) => {
    builder.addCase(getSettingsTasksCompleted, (state, { payload }) => {
      state.tasks = payload
    })
  }
)
