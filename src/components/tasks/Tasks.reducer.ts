import { createReducer } from '@reduxjs/toolkit'
import {
  getTasksCompleted,
  createTaskCompleted,
  createTasksCompleted,
} from './Tasks.actions'
import { getScheduleType } from './Tasks.helper'

export interface Task {
  CreatedAt: string
  DeletedAt: string | null
  Directory: {
    CoverageName: string
    CreatedAt: string
    DeletedAt: string | null
    ID: string
    Path: string
    UpdatedAt: string
  }
  DirectoryID: string
  ScheduleType: number
  id?: number
  coverageName?: string
  scheduleTypeName?: string
}

export interface ITasksState {
  tasks: Task[]
}

export const getInitialTasksState = (): ITasksState => {
  return {
    tasks: [],
  }
}

export const tasksReducer = createReducer(getInitialTasksState(), (builder) => {
  builder
    .addCase(getTasksCompleted, (state, { payload }: { payload: Task[] }) => {
      const data: Task[] = payload.map((task: Task, index) => {
        return {
          ...task,
          id: index + 1,
          coverageName: task.Directory.CoverageName,
          scheduleTypeName: getScheduleType(task.ScheduleType),
        }
      })

      state.tasks = data
    })
    .addCase(createTaskCompleted, (state, { payload }) => {
      const { task, coverageName } = payload
      const newTasks = [
        ...state.tasks,
        {
          ...task,
          id: state.tasks.length + 1,
          coverageName: coverageName,
          scheduleTypeName: getScheduleType(task.ScheduleType),
        },
      ]

      state.tasks = newTasks
    })
    .addCase(createTasksCompleted, (state, { payload }) => {
      state.tasks = payload
    })
})
