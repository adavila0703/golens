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

export const createTasksLoading = createAction<string>('CREATE_TASKS_LOADING')
export const createTasksFailed = createAction<string>('CREATE_TASKS_FAILED')
export const createTasksCompleted = createAction<any>('CREATE_TASKS_COMPLETED')

export const createTasks =
  (scheduleType: number): AppThunk =>
  async (dispatch) => {
    post({ scheduleType }, SettingsEndpoints.CreateTasks).then((resp) =>
      dispatch(createTasksCompleted(resp.tasks))
    )
  }

export const getIgnoredDirectoriesCompleted = createAction<any>(
  'GET_IGNORED_DIRECTORIES_COMPLETED'
)

export const getIgnoredDirectories = (): AppThunk => async (dispatch) => {
  get(SettingsEndpoints.GetIgnoredDirectories).then((resp) =>
    dispatch(getIgnoredDirectoriesCompleted(resp.directories))
  )
}

export const deleteIgnoredDirectoryCompleted = createAction<any>(
  'DELETE_IGNORED_DIRECTORIES_COMPLETED'
)

export const deleteIgnoredDirectory =
  (id: string): AppThunk =>
  async (dispatch) => {
    post({ id }, SettingsEndpoints.DeleteIgnoredDirectory).then(() =>
      dispatch(deleteIgnoredDirectoryCompleted(id))
    )
  }
