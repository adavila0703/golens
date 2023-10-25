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

export enum ScheduleType {
  MINUTE = 1,
  DAILY = 3,
  WEEKLY = 4,
  MONTHLY = 5,
}

export enum ScheduleTypeLabel {
  DAILY = 'Daily (12 AM)',
  WEEKLY = 'Weekly (Monday 12 AM)',
  MONTHLY = 'Monthly (1st 12 AM)',
}
