export const createDateBeforeToday = ({ year = 0, month = 0, day = 0 }) => {
  const now = new Date();
  return new Date(
    now.getFullYear() - year,
    now.getMonth() - month,
    now.getDate() - day
  ).toISOString();
}