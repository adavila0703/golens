import { createReducer } from '@reduxjs/toolkit'
import {
  getTasksCompleted,
  createTaskCompleted,
  createTasksCompleted,
} from './Tasks.actions'
import { getScheduleType } from './Tasks.helper'

export interface ITasksState {
  tasks: any[]
}

export const getInitialTasksState = (): ITasksState => {
  return {
    tasks: [],
  }
}

export const tasksReducer = createReducer(getInitialTasksState(), (builder) => {
  builder
    .addCase(getTasksCompleted, (state, { payload }: { payload: any[] }) => {
      const data: any[] = []

      payload.forEach((task, index) => {
        const newTask = {
          ...task,
          id: index + 1,
          coverageName: task.Directory.CoverageName,
          scheduleTypeName: getScheduleType(task.ScheduleType),
        }
        data.push(newTask)
      })

      state.tasks = data
    })
    .addCase(createTaskCompleted, (state, { payload }) => {
      const { task, coverageName } = payload
      const newTasks = [
        ...state.tasks,
        {
          ...payload,
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
