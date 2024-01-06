import dayjs from 'dayjs';

export function formatMonthDate(date){
  return dayjs(date).format('MM月DD日')
}