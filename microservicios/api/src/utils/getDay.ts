export function getDay(date, dayOfTheWeek, mondayOrSunday) {
  date = new Date(date); // eslint-disable-line no-param-reassign
  const day = date.getDay();
  const diff =
    date.getDate() - day + (day === 0 ? -mondayOrSunday : dayOfTheWeek);

  return new Date(date.setDate(diff));
}
