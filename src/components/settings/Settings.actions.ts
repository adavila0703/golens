import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { SettingsEndpoints, get, post } from '../../utils/api'

export const getSettingsTasksLoading = createAction<string>(
  'GET_DATA_TABLE_LOADING'
)
export const getSettingsTasksFailed = createAction<string>(
  'GET_DATA_TABLE_FAILED'
)
export const getSettingsTasksCompleted = createAction<any>(
  'GET_DATA_TABLE_COMPLETED'
)

export const getSettingsTasks = (): AppThunk => async (dispatch) => {
  get(SettingsEndpoints.GetTasks).then((resp) =>
    dispatch(getSettingsTasksCompleted(resp.tasks))
  )
}
