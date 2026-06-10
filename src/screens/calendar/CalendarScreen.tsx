import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  return <Calendar />;
}
const markedDates = {
  "2026-06-10": {
    selected: true,
    selectedColor: "green",
  },
};
<Calendar markedDates={markedDates} />