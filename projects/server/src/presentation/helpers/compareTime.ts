export function isTimeAfter(date1: Date, date2: Date): boolean {
  const hour1 = date1.getHours();
  const minute1 = date1.getMinutes();
  const second1 = date1.getSeconds();

  const hour2 = date2.getHours();
  const minute2 = date2.getMinutes();
  const second2 = date2.getSeconds();

  if (hour1 > hour2) {
    return true;
  } else if (hour1 < hour2) {
    return false;
  } else if (minute1 > minute2) {
    return true;
  } else if (minute1 < minute2) {
    return false;
  } else if (second1 > second2) {
    return true;
  } else {
    return false;
  }
}
