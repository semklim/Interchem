export function billIsExpires(date) {
  const startTime = new Date(date).getTime();
  const endTime = new Date().getTime();
  const duration = (endTime - startTime) / 1000;
  return duration > 86400;
}

export const formateDate = (date, precisely = false) => {

  if (precisely) {
    return new Intl.DateTimeFormat('uk', {
      weekday: 'long',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(date));
  }

  return new Intl.DateTimeFormat('uk', {
    weekday: 'short',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};