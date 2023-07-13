import { useEffect, useState } from "react";
import { formattedDay } from "./types/types";
import { getDayWeek } from "./services/getDayWeek";
import data from "./data.json";
import { formatSchedule } from "./services/formatSchedule";
import Item from "./components/item";
import "./App.css";

function App() {
  const [formattedSchedule, setFormattedSchedule] = useState<formattedDay[]>(
    []
  );
  const [dayWeek, setDayWeek] = useState<number>();

  useEffect(() => {
    const newSchedule = formatSchedule(data);
    setFormattedSchedule(newSchedule);
    setDayWeek(getDayWeek());
  }, []);

  return (
    <div className="scheduleBlock">
      <h1>Opening Hours</h1>
      <ul>
        {formattedSchedule.map((day, i) => (
          <Item key={i} day={day} today={i === dayWeek} />
        ))}
      </ul>
    </div>
  );
}

export default App;
