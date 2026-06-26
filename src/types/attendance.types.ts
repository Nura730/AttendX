export type AttendanceStatus = 'present' | 'absent' | 'od' | 'leave' | 'holiday' | 'cancelled';

export interface AttendanceRecord {
  id: string; // attendanceId
  semesterId: string; // associated semester to filter easily
  date: string; // YYYY-MM-DD
  subjectId: string;
  period: number; // period number (e.g. 1, 2, 3, etc.)
  status: AttendanceStatus;
  updatedAt: string; // ISO date string for offline sync resolution
}

export interface AttendanceStats {
  present: number;
  absent: number;
  od: number;
  leave: number;
  holiday: number;
  cancelled: number;
  totalActive: number; // present + absent
  percentage: number; // computed: present / totalActive * 100
}
