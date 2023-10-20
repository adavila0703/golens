import { createSelector } from '@reduxjs/toolkit'
import { dataSelector } from '../golens/GoLens.selector'
import { IAppReducerState } from '../../store/store'

export const ignoredDirectoriesSelector = (state: IAppReducerState) =>
  state.ignoredDirectoriesState.ignoredDirectories
