export interface Exam {
  id: string;
  semesterId: string;
  subjectId: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // "HH:MM" e.g., "14:00"
  venue: string | null;
  notes: string | null;
  createdAt: string; // ISO date string
}
