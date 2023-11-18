import { createReducer } from '@reduxjs/toolkit'
import {
  getPackageCoverageCompleted,
  removePackage,
} from './PackageCoverage.actions'

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
    builder
      .addCase(getPackageCoverageCompleted, (state, { payload }) => {
        state.data = payload.packageCoverage
      })
      .addCase(removePackage, (state, { payload }) => {
        state.data = state.data.filter(
          (packages) => packages.packageName !== payload
        )
      })
  }
)
