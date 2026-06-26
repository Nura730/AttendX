export interface PeriodSlot {
  periodNumber: number; // 1-based index (1, 2, 3...)
  subjectId: string | null; // null represents free period
  startTime: string; // "HH:MM" e.g., "09:00"
  endTime: string; // "HH:MM" e.g., "09:50"
}

export interface TimetableDay {
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  periods: PeriodSlot[];
}

// Client-side representation of today's active schedule (either from weekly timetable or overridden)
export interface ActivePeriod {
  periodNumber: number;
  subjectId: string | null;
  startTime: string;
  endTime: string;
  isOverridden: boolean;
}

export interface TodayTimetableOverride {
  date: string; // YYYY-MM-DD
  periods: PeriodSlot[];
}
