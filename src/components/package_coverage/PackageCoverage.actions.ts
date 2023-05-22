import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { Endpoint, post } from '../../utils/api'

export const getRepoDetailsLoading = createAction<string>('GET_REPO_DETAILS_LOADING')
export const getRepoDetailsFailed = createAction<string>('GET_REPO_DETAILS_FAILED')
export const getRepoDetailsCompleted = createAction<any>('GET_REPO_DETAILS_COMPLETED')

export const getRepoDetails =
  (id: string): AppThunk =>
  async (dispatch) => {
    const body = {
      id,
    }
    post(body, Endpoint.GetPackageCoverage).then((resp) => dispatch(getRepoDetailsCompleted(resp)))
  }
