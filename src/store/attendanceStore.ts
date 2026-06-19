import { create } from "zustand";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

import {
  AttendanceDay,
} from "../types/attendance";

import { Subject } from "../types/subject";

interface AttendanceState {
  loading: boolean;

  attendanceHistory:
    AttendanceDay[];

  saveAttendance: (
    attendance: AttendanceDay,
    uid: string,
    semesterId: string
  ) => Promise<void>;

  hasAttendanceForDate: (
    date: string,
    uid: string,
    semesterId: string
  ) => Promise<boolean>;

  loadAttendanceByDate: (
    date: string,
    uid: string,
    semesterId: string
  ) => Promise<
    AttendanceDay | null
  >;

  loadAttendanceHistory: (
    uid: string,
    semesterId: string
  ) => Promise<void>;

  recalculateSubjectStats: (
    uid: string,
    semesterId: string
  ) => Promise<void>;
}

export const useAttendanceStore =
  create<AttendanceState>(
    (set) => ({
      loading: false,

      attendanceHistory: [],

      saveAttendance: async (
        attendance,
        uid,
        semesterId
      ) => {
        await setDoc(
          doc(
            db,
            "users",
            uid,
            "semesters",
            semesterId,
            "attendance",
            attendance.date
          ),
          attendance
        );
      },

      hasAttendanceForDate:
        async (
          date,
          uid,
          semesterId
        ) => {
          const snapshot =
            await getDoc(
              doc(
                db,
                "users",
                uid,
                "semesters",
                semesterId,
                "attendance",
                date
              )
            );

          return snapshot.exists();
        },

      loadAttendanceByDate:
        async (
          date,
          uid,
          semesterId
        ) => {
          const snapshot =
            await getDoc(
              doc(
                db,
                "users",
                uid,
                "semesters",
                semesterId,
                "attendance",
                date
              )
            );

          if (
            !snapshot.exists()
          ) {
            return null;
          }

          return snapshot.data() as AttendanceDay;
        },

      loadAttendanceHistory:
        async (
          uid,
          semesterId
        ) => {
          const snapshot =
            await getDocs(
              collection(
                db,
                "users",
                uid,
                "semesters",
                semesterId,
                "attendance"
              )
            );

          const history =
            snapshot.docs.map(
              (doc) =>
                doc.data() as AttendanceDay
            );

          set({
            attendanceHistory:
              history,
          });
        },

      recalculateSubjectStats:
        async (
          uid,
          semesterId
        ) => {
          const attendanceSnapshot =
            await getDocs(
              collection(
                db,
                "users",
                uid,
                "semesters",
                semesterId,
                "attendance"
              )
            );

          const subjectSnapshot =
            await getDocs(
              collection(
                db,
                "users",
                uid,
                "semesters",
                semesterId,
                "subjects"
              )
            );

          const attendanceDocs =
            attendanceSnapshot.docs.map(
              (doc) =>
                doc.data() as AttendanceDay
            );

          const subjects =
            subjectSnapshot.docs.map(
              (doc) =>
                doc.data() as Subject
            );

          const updatedSubjects =
            subjects.map(
              (subject) => {
                let total = 0;

                let attended = 0;

                attendanceDocs.forEach(
                  (
                    attendance
                  ) => {
                    attendance.periods.forEach(
                      (
                        period
                      ) => {
                        if (
                          period.subjectId ===
                          subject.id
                        ) {
                          total++;

                          if (
                            period.status ===
                            "present"
                          ) {
                            attended++;
                          }
                        }
                      }
                    );
                  }
                );

                return {
                  ...subject,
                  totalPeriods:
                    total,
                  attendedPeriods:
                    attended,
                };
              }
            );

          for (const subject of updatedSubjects) {
            await setDoc(
              doc(
                db,
                "users",
                uid,
                "semesters",
                semesterId,
                "subjects",
                subject.id
              ),
              subject
            );
          }
        },
    })
  );