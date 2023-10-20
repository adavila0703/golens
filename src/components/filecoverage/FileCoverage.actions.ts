import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { post } from '../../utils/api'
import { DirectoryEndpoints } from '../../utils/endpoints'

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
    post(body, DirectoryEndpoints.GetFileCoverage).then((resp) =>
      dispatch(getFileCoverageCompleted(resp))
    )
  }
