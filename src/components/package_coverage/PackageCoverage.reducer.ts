import { createReducer } from '@reduxjs/toolkit'
import { getRepoDetailsCompleted } from './PackageCoverage.actions'

interface IFileCoverage {
  coverage: number
  fileName: string
}

export interface IRepoDetailsState {
  data: any[]
  fileCoverage: Record<string, IFileCoverage[]>
}

export const getInitialRepoDetailsState = (): IRepoDetailsState => {
  return {
    data: [],
    fileCoverage: {},
  }
}

export const repoDetailsReducer = createReducer(getInitialRepoDetailsState(), (builder) => {
  builder.addCase(getRepoDetailsCompleted, (state, { payload }) => {
    state.data = payload.packageCoverage
    state.fileCoverage = payload.fileCoverage
  })
})
