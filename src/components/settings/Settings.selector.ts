import { createSelector } from '@reduxjs/toolkit'
import { IAppReducerState } from '../../store/store'
import { dataSelector } from '../golens/GoLens.selector'

export const tasksSelector = (state: IAppReducerState) =>
  state.settingsState.tasks

export const getTasksSelector = createSelector(tasksSelector, (tasks) => tasks)

export const allSelectedSelector = createSelector(
  tasksSelector,
  dataSelector,
  (tasks, directories) => {
    return tasks.length === directories.length
  }
)

export const ignoredDirectoriesSelector = (state: IAppReducerState) =>
  state.settingsState.ignoredDirectories
