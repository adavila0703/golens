import { createAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../store/store'
import { get, post } from '../../utils/api'
import { TasksEndpoints } from '../../utils/endpoints'
import { Task } from './Tasks.reducer'

export const getTasksCompleted = createAction<Task[]>(
  'GET_SETTINGS_TASK_COMPLETED'
)

export const getTasks = (): AppThunk => async (dispatch) => {
  get(TasksEndpoints.GetTasks).then((resp) =>
    dispatch(getTasksCompleted(resp.tasks))
  )
}

export const createTaskCompleted = createAction<{
  task: Task
  coverageName: string
}>('CREATE_TASK_COMPLETED')

export const createTask =
  (directoryId: string, scheduleType: number): AppThunk =>
  async (dispatch) => {
    post({ directoryId, scheduleType }, TasksEndpoints.CreateTask).then(
      (resp) => dispatch(createTaskCompleted(resp))
    )
  }

export const createTasksCompleted = createAction<Task[]>(
  'CREATE_TASKS_COMPLETED'
)

export const createTasks =
  (scheduleType: number): AppThunk =>
  async (dispatch) => {
    post({ scheduleType }, TasksEndpoints.CreateTasks).then((resp) =>
      dispatch(createTasksCompleted(resp.tasks))
    )
  }
