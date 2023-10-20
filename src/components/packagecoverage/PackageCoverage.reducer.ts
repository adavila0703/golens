import { createReducer } from '@reduxjs/toolkit'
import { getPackageCoverageCompleted } from './PackageCoverage.actions'

export interface IPackageCoverageState {
  data: any[]
}

export const getInitialPackageCoverageState = (): IPackageCoverageState => {
  return {
    data: [],
  }
}

export const packageCoverageReducer = createReducer(
  getInitialPackageCoverageState(),
  (builder) => {
    builder.addCase(getPackageCoverageCompleted, (state, { payload }) => {
      console.log('packages', payload)
      state.data = payload.packageCoverage
    })
  }
)
