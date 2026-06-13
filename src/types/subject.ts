export type SubjectType =
  | "theory"
  | "lab";

export interface Subject {
  id: string;

  name: string;

  type: SubjectType;

  presentCount: number;

  absentCount: number;

  conductedCount: number;
}