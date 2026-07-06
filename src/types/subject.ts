export type SubjectType =
  | "theory"
  | "lab";

export interface Subject {
  id: string;

  name: string;

  code?: string;

  totalPeriods: number;

  attendedPeriods: number;

  targetAttendance: number;

  isActive: boolean;

  createdAt: string;
}