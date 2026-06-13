export interface Semester {
  id: string;

  semesterName: string;

  startDate: string;

  endDate: string;

  conductedPeriods: number;

  isActive: boolean;

  setupCompleted: boolean;

  createdAt: string;
}