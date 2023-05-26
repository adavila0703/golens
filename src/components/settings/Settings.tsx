import { useEffect } from 'react'
import { Schedule } from './schedule/Schedule'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getTableData } from './../golens/GoLens.actions'
import { getDataSelector } from './../golens/GoLens.selector'
import { tasksSelector } from './Settings.selector'
import { getSettingsTasks } from './Settings.actions'

export const Settings = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(getDataSelector)
  const tasks = useAppSelector(tasksSelector)

  useEffect(() => {
    if (data.length == 0) {
      dispatch(getTableData())
    }

    if (tasks.length == 0) {
      dispatch(getSettingsTasks())
    }
  }, [])

  console.log(tasks)

  return (
    <>
      <Schedule />
      <div>Settings page</div>
    </>
  )
}
