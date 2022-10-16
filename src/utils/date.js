import dayjs from 'dayjs';

export const getToday = () => {
  const date = dayjs();
  const day = date.format('YYYY-MM-DD');
  return day;
}

export const getTodayWeek = () => {
  if(dayjs().day() == '0') {
    return '7';
  }
  return dayjs().day();

}
export const translateWeek = (num) => {
  let res = '';
  switch(num) {
    case "1":
      res = "一";
      break;
    case "2":
      res = "二";
      break;
    case "3":
      res = "三";
      break;
    case "4":
      res = "四";
      break;
    case "5":
      res = "五";
      break;
    case "6":
      res = "六";
      break;
    case "7":
      res = "日";
      break;
    default:
      break;
  }
  return res;
}