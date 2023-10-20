export const getScheduleType = (type: number) => {
  switch (type) {
    case 1:
      return 'Daily'
    case 2:
      return 'Weekly'
    case 3:
      return 'Monthly'
  }
}

export const getScheduleInt = (schedule: string) => {
  switch (schedule) {
    case 'Daily (12 AM)':
      return 1
    case 'Weekly (Monday 12 AM)':
      return 2
    case 'Monthly (1st 12 AM)':
      return 3
  }
}
