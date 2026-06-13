import React, { useState } from "react";

import { useAuthStore } from "../store/authStore";
import { useSemesterStore } from "../store/semesterStore";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import SemesterScreen from "../screens/setup/SemesterScreen";
import SubjectScreen from "../screens/setup/SubjectScreen";

import DashboardScreen from "../screens/main/DashboardScreen";

export default function AppNavigator() {
  const user = useAuthStore(
    (state) => state.user
  );

  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  const loading =
    useSemesterStore(
      (state) => state.loading
    );

  const [showRegister, setShowRegister] =
    useState(false);

  if (!user) {
    if (showRegister) {
      return (
        <RegisterScreen
          onLoginPress={() =>
            setShowRegister(false)
          }
        />
      );
    }

    return (
      <LoginScreen
        onRegisterPress={() =>
          setShowRegister(true)
        }
      />
    );
  }

  if (loading) {
    return null;
  }

  if (!semester) {
    return <SemesterScreen />;
  }

  if (!semester.setupCompleted) {
    return <SubjectScreen />;
  }

  return <DashboardScreen />;
}