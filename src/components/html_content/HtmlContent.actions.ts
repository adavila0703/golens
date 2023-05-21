import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { Endpoint, post } from '../../utils/api'

export const getHtmlContentLoading = createAction<string>('GET_REPO_DETAILS_LOADING')
export const getHtmlContentFailed = createAction<string>('GET_REPO_DETAILS_FAILED')
export const getHtmlContentCompleted = createAction<any>('GET_REPO_DETAILS_COMPLETED')

export const getHtmlContent =
  (id: string, fileName: string): AppThunk =>
  async (dispatch) => {
    const body = {
      repoId: id,
      fileName: fileName,
    }
    post(body, Endpoint.GetHtmlContents).then((resp) => dispatch(getHtmlContentCompleted(resp.htmlContent)))
  }