import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { post } from '../../utils/api'
import { DirectoryEndpoints } from '../../utils/endpoints'

export const getPackageCoverageCompleted = createAction<any>(
  'GET_PACKAGE_COVERAGE_COMPLETED'
)

export const getPackageCoverage =
  (id: string): AppThunk =>
  async (dispatch) => {
    post({ id }, DirectoryEndpoints.GetPackageCoverage).then((resp) =>
      dispatch(getPackageCoverageCompleted(resp))
    )
  }

export const removePackage = createAction<string>('REMOVE_PACKAGE')
