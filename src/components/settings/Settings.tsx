import { useEffect } from 'react'
import { Schedule } from './schedule/Schedule'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getTableData } from './../golens/GoLens.actions'
import { getDataSelector } from './../golens/GoLens.selector'
import { tasksSelector } from './Settings.selector'
import { getIgnoredDirectories, getSettingsTasks } from './Settings.actions'
import { Divider } from '@mui/material'
import { IgnoredDirectories } from './ignoreddirectories/IgnoredDirectories'
import { SettingsContainer } from './Settings.style'

export const Settings = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(getDataSelector)
  const tasks = useAppSelector(tasksSelector)

  useEffect(() => {
    if (data?.length == 0) {
      dispatch(getTableData())
    }

    if (tasks?.length == 0) {
      dispatch(getSettingsTasks())
    }

    dispatch(getIgnoredDirectories())
  }, [])

  return (
    <SettingsContainer>
      <IgnoredDirectories />
      <Divider sx={{ backgroundColor: 'white' }} />
      <Schedule />
    </SettingsContainer>
  )
}
