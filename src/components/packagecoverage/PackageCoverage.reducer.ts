import { createReducer } from '@reduxjs/toolkit'
import { getPackageCoverageCompleted } from './PackageCoverage.actions'

export interface IPackageData {
  packageName: string
  coveredLines: number
  totalLines: number
}

export interface IPackageCoverageState {
  data: IPackageData[]
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
      state.data = payload.packageCoverage
    })
  }
)
