import dayjs from 'dayjs'

export const getDateRange = (startDate, endDate) => {
  const days = dayjs(endDate).diff(dayjs(startDate), 'day')

  return [...Array(days + 1).keys()].map(i =>
    dayjs(startDate).add(i, 'day').format('MM/DD/YYYY')
  )
}
