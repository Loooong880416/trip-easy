import dayjs from 'dayjs';

export function formatMonthDate(date) {
  return dayjs(date).format('MM月DD日')
}

// 计算时间差
export function getDiffDays(start, end) {
  return dayjs(end).diff(dayjs(start), 'day')
}