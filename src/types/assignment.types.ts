export interface Assignment {
  id: string;
  semesterId: string;
  subjectId: string;
  title: string;
  description: string;
  dueDate: string; // ISO date string or YYYY-MM-DD
  isCompleted: boolean;
  createdAt: string; // ISO date string
}
