import { createReducer } from '@reduxjs/toolkit'
import {
  getSettingsTasksCompleted,
  createTaskCompleted,
  createTasksCompleted,
} from './Settings.actions'
import { getScheduleType } from './Settings.helper'

export interface ISettingsState {
  tasks: any[]
}

export const getInitialSettingsState = (): ISettingsState => {
  return {
    tasks: [],
  }
}

export const settingsReducer = createReducer(
  getInitialSettingsState(),
  (builder) => {
    builder
      .addCase(
        getSettingsTasksCompleted,
        (state, { payload }: { payload: any[] }) => {
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
        }
      )
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
        console.log(payload)
        state.tasks = payload
      })
  }
)
