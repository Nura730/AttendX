import { AttendanceStatus } from "./attendance";

export interface DailyPeriod {
  periodNumber: number;

  subjectId: string;

  status: AttendanceStatus;
}