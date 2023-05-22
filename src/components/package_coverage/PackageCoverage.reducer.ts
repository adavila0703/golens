import { createReducer } from '@reduxjs/toolkit'
import { getRepoDetailsCompleted } from './PackageCoverage.actions'

export interface IRepoDetailsState {
  data: any[]
}

export const getInitialRepoDetailsState = (): IRepoDetailsState => {
  return {
    data: [],
  }
}

export const repoDetailsReducer = createReducer(getInitialRepoDetailsState(), (builder) => {
  builder.addCase(getRepoDetailsCompleted, (state, { payload }) => {
    state.data = payload.packageCoverage
  })
})
