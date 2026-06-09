export interface Subject {
  id: string;

  name: string;

  facultyName: string;
}

export interface Semester {
  id: string;

  name: string;

  targetAttendance: number;

  subjects: Subject[];
}
