import { createReducer } from '@reduxjs/toolkit'
import { getFileCoverageCompleted } from './FileCoverage.actions'

interface IFileCoverage {
  coverage: number
  fileName: string
}

export interface IFileCoverageState {
  fileCoverage: IFileCoverage[]
}

export const getInitialFileCoverageState = (): IFileCoverageState => {
  return {
    fileCoverage: [],
  }
}

export const fileCoverageReducer = createReducer(getInitialFileCoverageState(), (builder) => {
  builder.addCase(getFileCoverageCompleted, (state, { payload }) => {
    state.fileCoverage = payload.fileCoverage
  })
})
