import { createSelector } from 'reselect'
import { dataSelector } from '../golens/GoLens.selector'
import { IAppReducerState } from '../../store/store'

export const tasksSelector = (state: IAppReducerState) =>
  state.settingsState.tasks

export const getTasksSelector = createSelector(tasksSelector, (tasks) => tasks)

export const allSelectedSelector = createSelector(
  tasksSelector,
  dataSelector,
  (tasks, directories) => {
    return tasks?.length === directories?.length
  }
)
