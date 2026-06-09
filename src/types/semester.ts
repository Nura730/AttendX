export interface Subject {
  id: string;

  name: string;

  facultyName: string;

  attendedPeriods: number;

  totalPeriods: number;
}

export interface Semester {
  id: string;

  name: string;

  targetAttendance: number;

  subjects: Subject[];
}