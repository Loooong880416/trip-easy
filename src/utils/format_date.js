import dayjs from 'dayjs';

export function formatMonthDate(date, formatStr = "MM月DD日") {
  return dayjs(date).format(formatStr)
}

// 计算时间差
export function getDiffDays(start, end) {
  return dayjs(end).diff(dayjs(start), 'day')
}