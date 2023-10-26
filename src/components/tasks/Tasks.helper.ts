export enum ScheduleType {
  MINUTE = 1,
  DAILY = 3,
  WEEKLY = 4,
  MONTHLY = 5,
}

export const getScheduleType = (type: number) => {
  switch (type) {
    case ScheduleType.DAILY:
      return 'Daily'
    case ScheduleType.WEEKLY:
      return 'Weekly'
    case ScheduleType.MONTHLY:
      return 'Monthly'
  }
}

export enum ScheduleTypeLabel {
  DAILY = 'Daily (12 AM)',
  WEEKLY = 'Weekly (Monday 12 AM)',
  MONTHLY = 'Monthly (1st 12 AM)',
}
