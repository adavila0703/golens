import { createReducer } from '@reduxjs/toolkit'
import { getFileCoverageCompleted } from './FileCoverage.actions'

export interface IFileData {
  totalLines: number
  coveredLines: number
  fileName: string
}

export interface IFileCoverageState {
  fileCoverage: IFileData[]
}

export const getInitialFileCoverageState = (): IFileCoverageState => {
  return {
    fileCoverage: [],
  }
}

export const fileCoverageReducer = createReducer(
  getInitialFileCoverageState(),
  (builder) => {
    builder.addCase(getFileCoverageCompleted, (state, { payload }) => {
      state.fileCoverage = payload.fileCoverage
    })
  }
)
