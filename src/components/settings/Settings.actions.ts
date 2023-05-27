import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { SettingsEndpoints, get, post } from '../../utils/api'

export const getSettingsTasksLoading = createAction<string>(
  'GET_SETTINGS_TASK_LOADING'
)
export const getSettingsTasksFailed = createAction<string>(
  'GET_SETTINGS_TASK_FAILED'
)
export const getSettingsTasksCompleted = createAction<any>(
  'GET_SETTINGS_TASK_COMPLETED'
)

export const getSettingsTasks = (): AppThunk => async (dispatch) => {
  get(SettingsEndpoints.GetTasks).then((resp) =>
    dispatch(getSettingsTasksCompleted(resp.tasks))
  )
}

export const createTaskLoading = createAction<string>('CREATE_TASK_LOADING')
export const createTaskFailed = createAction<string>('CREATE_TASK_FAILED')
export const createTaskCompleted = createAction<any>('CREATE_TASK_COMPLETED')

export const createTask =
  (directoryId: string, scheduleType: number): AppThunk =>
  async (dispatch) => {
    post({ directoryId, scheduleType }, SettingsEndpoints.CreateTask).then(
      (resp) => dispatch(createTaskCompleted(resp))
    )
  }
