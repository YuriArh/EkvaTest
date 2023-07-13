import { Schedule, formattedDay } from "../types/types";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours} ${period}`;
}

export function formatSchedule(schedule: Schedule): formattedDay[] {
  const formattedSchedule: formattedDay[] = [];

  daysOfWeek.forEach((day, index) => {
    const currentDay = schedule[day];
    const nextDay =
      schedule[daysOfWeek[index + 1 === daysOfWeek.length ? 0 : index + 1]];

    let openTime = "";
    let closeTime = "";

    if (!currentDay.find((elem) => elem.type === "open")) {
      formattedSchedule.push({ day, close: true });
    } else if (
      currentDay[0].type === "open" &&
      currentDay[1]?.type === "close"
    ) {
      openTime = formatTime(currentDay[0].value);
      closeTime = formatTime(currentDay[1].value);

      formattedSchedule.push({ day, openTime, closeTime, close: false });
    } else if (currentDay[currentDay.length - 1].type === "open") {
      openTime = formatTime(currentDay[currentDay.length - 1].value);
      closeTime = formatTime(nextDay[0].value);
      formattedSchedule.push({ day, openTime, closeTime, close: false });
    } else if (
      currentDay[currentDay.length - 1].type === "close" &&
      currentDay[currentDay.length - 2].type === "open"
    ) {
      openTime = formatTime(currentDay[currentDay.length - 2].value);
      closeTime = formatTime(currentDay[currentDay.length - 1].value);
      formattedSchedule.push({ day, openTime, closeTime, close: false });
    }
  });
  return formattedSchedule;
}
