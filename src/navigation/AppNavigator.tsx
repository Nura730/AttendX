import React, { useState } from "react";
import { View, Text } from "react-native";

import { useAuthStore } from "../store/authStore";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Logged In</Text>
    </View>
  );
};

export default function AppNavigator() {
  const user = useAuthStore(
    (state) => state.user
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

  return <HomeScreen />;
}