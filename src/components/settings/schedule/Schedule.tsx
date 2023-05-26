import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material'
import './Schedule.css'
import { useAppSelector } from '../../../store/store'
import { dataSelector } from '../../golens/GoLens.selector'

export const Schedule = () => {
  const tableData = useAppSelector(dataSelector)
  const sortedArray = Array.from(tableData)

  sortedArray.sort((a, b) => {
    if (a.coverageName < b.coverageName) {
      return -1
    }

    if (a.coverageName > b.coverageName) {
      return 1
    }

    return 0
  })

  return (
    <>
      <h1>Schedule</h1>
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
            onChange={() => console.log('hi')}
            style={{
              color: 'black',
              borderColor: 'white',
              backgroundColor: 'white',
            }}
            // error={selectError}
          >
            <MenuItem>All</MenuItem>
            {sortedArray &&
              sortedArray.map((data) => {
                return <MenuItem>{data.coverageName}</MenuItem>
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
            onChange={() => console.log('hi')}
            style={{
              color: 'black',
              borderColor: 'white',
              backgroundColor: 'white',
            }}
            // error={selectError}
          >
            <MenuItem>Daily (12 AM)</MenuItem>
            <MenuItem>Weekly (Monday 12 AM)</MenuItem>
            <MenuItem>Monthly (1st 12 AM)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button
        onClick={() => console.log('push')}
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
    </>
  )
}
