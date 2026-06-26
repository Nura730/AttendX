export interface AcademicYear {
  id: string;
  name: string; // e.g. "2025-2026"
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface Semester {
  id: string;
  academicYearId: string;
  name: string; // e.g. "Semester 1"
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  isArchived: boolean;
  periodsPerDay: number;
  createdAt: string; // ISO date string
}

export interface Subject {
  id: string;
  semesterId: string;
  name: string;
  code: string;
  faculty: string | null;
  credits: number;
  classroom: string | null;
  color: string; // Theme color name or hex
  icon: string; // Expo Vector Icons name
  createdAt: string; // ISO date string;
}
