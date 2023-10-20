import { createReducer } from '@reduxjs/toolkit'
import {
  getIgnoredDirectoriesCompleted,
  deleteIgnoredDirectoryCompleted,
} from './IgnoredDirectories.actions'

export interface IIgnoredDirectoriesState {
  tasks: any[]
  ignoredDirectories: any[]
}

export const getInitialIgnoredDirectoriesState =
  (): IIgnoredDirectoriesState => {
    return {
      tasks: [],
      ignoredDirectories: [],
    }
  }

export const ignoredDirectoriesReducer = createReducer(
  getInitialIgnoredDirectoriesState(),
  (builder) => {
    builder
      .addCase(getIgnoredDirectoriesCompleted, (state, { payload }) => {
        state.ignoredDirectories = payload
      })
      .addCase(deleteIgnoredDirectoryCompleted, (state, { payload }) => {
        const newIgnoredDirectories = state.ignoredDirectories.filter(
          (directory) => directory.ID !== payload
        )

        state.ignoredDirectories = newIgnoredDirectories
      })
  }
)
