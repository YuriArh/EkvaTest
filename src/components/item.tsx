import { formattedDay } from "../types/types";

interface Props {
  day: formattedDay;
  today: boolean;
}

export default function Item({ day, today }: Props) {
  return (
    <li>
      <span className="left-text">{day.day}</span>
      {today ? <span className="center-text">{today ? "today" : ""}</span> : ""}
      <span className={day.close ? "closed" : "right-text"}>
        {day.close ? "Closed" : `${day.openTime} - ${day.closeTime}`}
      </span>
    </li>
  );
}
