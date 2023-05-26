import { createSelector } from '@reduxjs/toolkit'
import { IAppReducerState } from '../../store/store'

export const tasksSelector = (state: IAppReducerState) =>
  state.settingsState.tasks
