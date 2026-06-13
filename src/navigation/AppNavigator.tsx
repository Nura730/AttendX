import React from "react";
import { View, Text } from "react-native";

import { useAuthStore } from "../store/authStore";

const AuthScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Auth Screen</Text>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
    </View>
  );
};

export default function AppNavigator() {
  const user = useAuthStore(
    (state) => state.user
  );

  if (!user) {
    return <AuthScreen />;
  }

  return <HomeScreen />;
}