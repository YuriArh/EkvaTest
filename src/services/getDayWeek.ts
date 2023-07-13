export function getDayWeek() {
  let date = new Date();
  let dayWeek = [6, 0, 1, 2, 3, 4, 5][date.getDay()];

  return dayWeek;
}
