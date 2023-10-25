import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { get, post } from '../../utils/api'
import { TasksEndpoints } from '../../utils/endpoints'

export const getTasksCompleted = createAction<any>(
  'GET_SETTINGS_TASK_COMPLETED'
)

export const getTasks = (): AppThunk => async (dispatch) => {
  get(TasksEndpoints.GetTasks).then((resp) =>
    dispatch(getTasksCompleted(resp.tasks))
  )
}

export const createTaskLoading = createAction<string>('CREATE_TASK_LOADING')
export const createTaskFailed = createAction<string>('CREATE_TASK_FAILED')
export const createTaskCompleted = createAction<any>('CREATE_TASK_COMPLETED')

export const createTask =
  (directoryId: string, scheduleType: number): AppThunk =>
  async (dispatch) => {
    post({ directoryId, scheduleType }, TasksEndpoints.CreateTask).then(
      (resp) => dispatch(createTaskCompleted(resp))
    )
  }

export const createTasksLoading = createAction<string>('CREATE_TASKS_LOADING')
export const createTasksFailed = createAction<string>('CREATE_TASKS_FAILED')
export const createTasksCompleted = createAction<any>('CREATE_TASKS_COMPLETED')

export const createTasks =
  (scheduleType: number): AppThunk =>
  async (dispatch) => {
    post({ scheduleType }, TasksEndpoints.CreateTasks).then((resp) =>
      dispatch(createTasksCompleted(resp.tasks))
    )
  }

export const getIgnoredDirectoriesCompleted = createAction<any>(
  'GET_IGNORED_DIRECTORIES_COMPLETED'
)
