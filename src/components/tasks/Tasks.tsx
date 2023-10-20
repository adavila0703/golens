import { useState } from 'react'
import { allSelectedSelector, tasksSelector } from './Tasks.selector'
import { createTask, createTasks } from './Tasks.actions'
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { SettingsContainer } from './Tasks.style'
import { getScheduleInt } from './Tasks.helper'
import { useSnackbar } from 'notistack'
import { TaskTable } from './taskstable/TasksTable'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getDataSelector } from '../golens/GoLens.selector'
import { PageTitle } from '../pagetitle/PageTitle'

export const Tasks = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(tasksSelector)

  const tableData = useAppSelector(getDataSelector)
  const sortedArray = Array.from(tableData)
  const { enqueueSnackbar } = useSnackbar()

  sortedArray.sort((a, b) => {
    if (a.coverageName < b.coverageName) {
      return -1
    }

    if (a.coverageName > b.coverageName) {
      return 1
    }

    return 0
  })

  const [directoryId, setDirectoryId] = useState<string>('')
  const [schedule, setSchedule] = useState<number>(0)

  const [directoryError, setDirectoryError] = useState<boolean>(false)
  const [scheduleError, setScheduleError] = useState<boolean>(false)
  const allSelected = useAppSelector(allSelectedSelector)

  const validateFields = () => {
    if (directoryId === '' || schedule === 0) {
      if (directoryId === '') {
        setDirectoryError(true)
        enqueueSnackbar('Directory field needs to be selected.', {
          variant: 'error',
        })
      }

      if (schedule === 0) {
        setScheduleError(true)
        enqueueSnackbar('Schedule type field needs to be selected.', {
          variant: 'error',
        })
      }
      return false
    }

    if (allSelected) {
      enqueueSnackbar('All available directories have been scheduled.', {
        variant: 'error',
      })
      return false
    }

    setDirectoryError(false)
    setScheduleError(false)
    return true
  }

  const handleCreateTask = () => {
    const validated = validateFields()

    if (validated && directoryId === 'All') {
      dispatch(createTasks(schedule))
    } else if (validated) {
      dispatch(createTask(directoryId, schedule))
    }
  }

  return (
    <SettingsContainer>
      <PageTitle title="Tasks" />
      <p>Select directory you would like to schedule to update.</p>
      <p>
        Note: If you chose "All", you will not be able to chose individual
        directories unless that schedule is deleted
      </p>
      <div className="schedule-input-background">
        <FormControl className="schedule-input" fullWidth>
          <InputLabel id="directory-type-label" style={{ color: 'black' }}>
            Directory
          </InputLabel>
          <Select
            labelId="directory-type-label"
            id="directory-type"
            label="Directory"
            onChange={(e) => {
              if (e.target.value === 'All') {
                setDirectoryId('All')
                return
              }

              const directory = tableData.filter(
                (row) => row.coverageName === (e.target.value as string)
              )
              setDirectoryId(directory[0].id)
            }}
            style={{
              color: 'black',
              borderColor: 'white',
              backgroundColor: 'white',
            }}
            error={directoryError}
          >
            <MenuItem value={'All'}>All</MenuItem>
            {sortedArray &&
              sortedArray.map((data) => {
                let exists = false
                tasks.forEach((task: any) => {
                  if (task.coverageName === data.coverageName) {
                    exists = true
                  }
                })

                if (!exists) {
                  return (
                    <MenuItem value={data.coverageName}>
                      {data.coverageName}
                    </MenuItem>
                  )
                }
              })}
          </Select>
        </FormControl>
      </div>
      <p>Choose the schedule type.</p>
      <div className="schedule-input-background">
        <FormControl className="schedule-input" fullWidth>
          <InputLabel id="directory-type-label" style={{ color: 'black' }}>
            Schedule Type
          </InputLabel>
          <Select
            labelId="directory-type-label"
            id="directory-type"
            label="Schedule Type"
            onChange={(e) => {
              const scheduleInt = getScheduleInt(e.target.value as string)
              if (scheduleInt) {
                setSchedule(scheduleInt)
              }
            }}
            style={{
              color: 'black',
              borderColor: 'white',
              backgroundColor: 'white',
            }}
            error={scheduleError}
          >
            <MenuItem value={'Daily (12 AM)'}>Daily (12 AM)</MenuItem>
            <MenuItem value={'Weekly (Monday 12 AM)'}>
              Weekly (Monday 12 AM)
            </MenuItem>
            <MenuItem value={'Monthly (1st 12 AM)'}>
              Monthly (1st 12 AM)
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button
        onClick={handleCreateTask}
        variant="outlined"
        style={{
          color: 'white',
          borderColor: 'white',
          width: '200px',
          marginTop: '10px',
        }}
      >
        Schedule
      </Button>

      <Divider
        style={{
          backgroundColor: 'white',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      />
      <h2>Currently Scheduled</h2>
      <TaskTable />
    </SettingsContainer>
  )
}
