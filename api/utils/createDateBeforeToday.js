export const createDateBeforeToday = ({ year = 0, month = 0, day = 0, precisely = false }) => {
  const now = new Date();
  if (precisely) {
    return new Date(
      now.getFullYear() - year,
      now.getMonth() - month,
      now.getDate() - day,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ).toISOString();

  } else {
    return new Date(
      now.getFullYear() - year,
      now.getMonth() - month,
      now.getDate() - day,
    ).toISOString();
  }
}