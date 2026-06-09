export interface DailyPeriod {
  periodNumber: number;

  subjectId: string;

  status:
    | "present"
    | "absent"
    | "cancelled";
}