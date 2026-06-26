import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AcademicYear, Semester, Subject } from '../types';

interface AcademicState {
  academicYears: AcademicYear[];
  semesters: Semester[];
  subjects: Subject[];
  activeYearId: string | null;
  activeSemesterId: string | null;
  
  setAcademicYears: (years: AcademicYear[]) => void;
  setSemesters: (semesters: Semester[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  
  setActiveYearId: (id: string | null) => void;
  setActiveSemesterId: (id: string | null) => void;
  
  addAcademicYear: (year: AcademicYear) => void;
  addSemester: (semester: Semester) => void;
  addSubject: (subject: Subject) => void;
  
  updateSubject: (subjectId: string, updated: Partial<Subject>) => void;
  deleteSubject: (subjectId: string) => void;
  
  archiveSemester: (semesterId: string, isArchived: boolean) => void;
  resetAcademicStore: () => void;
}

export const useAcademicStore = create<AcademicState>()(
  persist(
    (set) => ({
      academicYears: [],
      semesters: [],
      subjects: [],
      activeYearId: null,
      activeSemesterId: null,

      setAcademicYears: (academicYears) => set({ academicYears }),
      setSemesters: (semesters) => set({ semesters }),
      setSubjects: (subjects) => set({ subjects }),
      
      setActiveYearId: (activeYearId) => set({ activeYearId }),
      setActiveSemesterId: (activeSemesterId) => set({ activeSemesterId }),

      addAcademicYear: (year) => set((state) => ({
        academicYears: [...state.academicYears, year]
      })),

      addSemester: (semester) => set((state) => ({
        semesters: [...state.semesters, semester]
      })),

      addSubject: (subject) => set((state) => ({
        subjects: [...state.subjects, subject]
      })),

      updateSubject: (subjectId, updated) => set((state) => ({
        subjects: state.subjects.map((sub) => 
          sub.id === subjectId ? { ...sub, ...updated } : sub
        )
      })),

      deleteSubject: (subjectId) => set((state) => ({
        subjects: state.subjects.filter((sub) => sub.id !== subjectId)
      })),

      archiveSemester: (semesterId, isArchived) => set((state) => ({
        semesters: state.semesters.map((sem) => 
          sem.id === semesterId ? { ...sem, isArchived } : sem
        )
      })),

      resetAcademicStore: () => set({
        academicYears: [],
        semesters: [],
        subjects: [],
        activeYearId: null,
        activeSemesterId: null
      }),
    }),
    {
      name: 'attendx-academic-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
