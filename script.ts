interface Schedule {
  [key: string]: { type: string; value: number }[];
}

interface formattedDay {
  day: string;
  openTime?: string;
  closeTime?: string;
  close: boolean;
}

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

//получаем номер сегодняшнего дня недели
function getDayWeek() {
  let date = new Date();
  let dayWeek = [7, 1, 2, 3, 4, 5, 6][date.getDay()];

  dayWeek -= 1;

  return dayWeek.toString();
}

//форматируем миллисекунды в часы
function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours} ${period}`;
}

//форматируем наше расписание
function formatSchedule(schedule: Schedule): formattedDay[] {
  const formattedSchedule: formattedDay[] = [];

  daysOfWeek.forEach((day, index) => {
    const currentDay = schedule[day];
    const nextDay = schedule[daysOfWeek[index + 1]];
    let openTime = "";
    let closeTime = "";

    if (currentDay.length === 0) {
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

//подгружаем данные из json
async function loadJSON(url: string): Promise<any> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// создаем элементы для отображения в DOM
async function displaySchedule() {
  try {
    const jsonData = await loadJSON("data.json");
    const formattedSchedule: formattedDay[] = formatSchedule(jsonData);
    const dayWeek = getDayWeek();
    const scheduleList = document.getElementById("schedule");
    if (scheduleList) {
      for (const day in formattedSchedule) {
        const listItem = document.createElement("li");
        const spanLeft = document.createElement("span");
        const spanRight = document.createElement("span");

        spanLeft.textContent = `${formattedSchedule[day].day}`;
        spanLeft.setAttribute("id", "left-text");
        spanRight.setAttribute("id", "right-text");

        if (formattedSchedule[day].close) {
          spanRight.textContent = "close";
          spanRight.classList.add("closed");
        } else {
          spanRight.textContent = `${formattedSchedule[day].openTime} - ${formattedSchedule[day].closeTime}`;
        }

        listItem.appendChild(spanLeft);

        if (day === dayWeek) {
          const spanCenter = document.createElement("span");
          spanCenter.textContent = "today";
          spanCenter.setAttribute("id", "center-text");
          listItem.appendChild(spanCenter);
        }

        listItem.appendChild(spanRight);

        scheduleList.appendChild(listItem);
      }
    } else {
      console.error("Элемент списка 'schedule' не найден.");
    }
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

displaySchedule();
