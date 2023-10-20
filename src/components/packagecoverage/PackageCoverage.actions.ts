import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { GolensEndpoints, post } from '../../utils/api'

export const packageCoverageLoading = createAction<string>(
  'GET_PACKAGE_COVERAGE_LOADING'
)
export const getPackageCoverageFailed = createAction<string>(
  'GET_PACKAGE_COVERAGE_FAILED'
)
export const getPackageCoverageCompleted = createAction<any>(
  'GET_PACKAGE_COVERAGE_COMPLETED'
)

export const getPackageCoverage =
  (id: string): AppThunk =>
  async (dispatch) => {
    const body = {
      id,
    }
    post(body, GolensEndpoints.GetPackageCoverage).then((resp) =>
      dispatch(getPackageCoverageCompleted(resp))
    )
  }
