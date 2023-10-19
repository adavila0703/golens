import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { GolensEndpoints, post } from '../../utils/api'

export const getFileCoverageLoading = createAction<string>(
  'GET_REPO_DETAILS_LOADING'
)
export const getFileCoverageFailed = createAction<string>(
  'GET_REPO_DETAILS_FAILED'
)
export const getFileCoverageCompleted = createAction<any>(
  'GET_REPO_DETAILS_COMPLETED'
)

export const getFileCoverage =
  (id: string, packageName: string): AppThunk =>
  async (dispatch) => {
    const body = {
      repoId: id,
      packageName,
    }
    post(body, GolensEndpoints.GetFileCoverage).then((resp) =>
      dispatch(getFileCoverageCompleted(resp))
    )
  }
