export function tomorrowDate(todayDate) {

  const day = todayDate.getDay();
  let plusToDate = 0;

  switch (day) {
    case 0: {
      plusToDate += 1;
      break;
    }
    case 6: {
      plusToDate += 2;
      break;
    }
    case 5: {
      plusToDate += 3;
      break;
    }
  }

  return  new Date(
    todayDate.getFullYear(),
    todayDate.getMonth(),
    todayDate.getDate() + plusToDate,
  );
}