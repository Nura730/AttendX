import { useEffect } from "react";

import { useAuthStore } from "../store/authStore";

import { useSemesterStore } from "../store/semesterStore";

import { useSubjectStore } from "../store/subjectStore";

export const useInitialData =
  () => {
    const user =
      useAuthStore(
        (state) => state.user
      );

    const semester =
      useSemesterStore(
        (state) => state.semester
      );

    const loadSubjects =
      useSubjectStore(
        (state) =>
          state.loadSubjects
      );

    useEffect(() => {
      if (
        !user ||
        !semester
      ) {
        return;
      }

      loadSubjects(
        user.uid,
        semester.id
      );
    }, [
      user,
      semester,
    ]);
  };