import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { get, post } from '../../utils/api'
import { IgnoredEndpoints } from '../../utils/endpoints'

export const getIgnoredCompleted = createAction<any>(
  'GET_IGNORED_DIRECTORIES_COMPLETED'
)

export const getIgnored = (): AppThunk => async (dispatch) => {
  get(IgnoredEndpoints.GetIgnored).then((resp) =>
    dispatch(getIgnoredCompleted(resp.directories))
  )
}

export const deleteIgnoredCompleted = createAction<any>(
  'DELETE_IGNORED_DIRECTORIES_COMPLETED'
)

export const deleteIgnored =
  (id: string): AppThunk =>
  async (dispatch) => {
    post({ id }, IgnoredEndpoints.DeleteIgnored).then(() =>
      dispatch(deleteIgnoredCompleted(id))
    )
  }
