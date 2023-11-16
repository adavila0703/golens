import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { get, post } from '../../utils/api'
import { IgnoreDirectoryEndpoints } from '../../utils/endpoints'

export const getIgnoredDirectoriesCompleted = createAction<any>(
  'GET_IGNORED_DIRECTORIES_COMPLETED'
)

export const getIgnoredDirectories = (): AppThunk => async (dispatch) => {
  get(IgnoreDirectoryEndpoints.GetIgnored).then((resp) =>
    dispatch(getIgnoredDirectoriesCompleted(resp.directories))
  )
}

export const deleteIgnoredDirectoryCompleted = createAction<any>(
  'DELETE_IGNORED_DIRECTORIES_COMPLETED'
)

export const deleteIgnoredDirectory =
  (id: string): AppThunk =>
  async (dispatch) => {
    post({ id }, IgnoreDirectoryEndpoints.DeleteIgnored).then(() =>
      dispatch(deleteIgnoredDirectoryCompleted(id))
    )
  }
