export interface Subject {
  id: string;

  name: string;

  facultyName: string;

  totalPeriods: number;

  attendedPeriods: number;

  absentPeriods: number;
}

export interface Semester {
  id: string;

  name: string;

  targetAttendance: number;

  totalSemesterPeriods: number;

  subjects: Subject[];
}

export interface UserProfile {
  userId: string;

  name: string;

  email: string;
}