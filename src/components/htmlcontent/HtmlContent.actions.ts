import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { post } from '../../utils/api'
import { DirectoryEndpoints } from '../../utils/endpoints'

export const getHtmlContentCompleted = createAction<any>(
  'GET_REPO_DETAILS_COMPLETED'
)

export const getHtmlContent =
  (id: string, fileName: string, packageName: string): AppThunk =>
  async (dispatch) => {
    console.log(fileName)
    const body = {
      directoryId: id,
      fileName,
      packageName,
    }
    post(body, DirectoryEndpoints.GetHtmlContents).then((resp) =>
      dispatch(getHtmlContentCompleted(resp))
    )
  }
