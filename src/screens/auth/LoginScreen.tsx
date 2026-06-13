import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";

import { useAuthStore } from "../../store/authStore";

interface Props {
  onRegisterPress: () => void;
}

export default function LoginScreen({
  onRegisterPress,
}: Props) {
  const login = useAuthStore(
    (state) => state.login
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.message
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 10,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        AttendX Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <Button
        title={
          loading
            ? "Loading..."
            : "Login"
        }
        onPress={handleLogin}
      />

      <Button
        title="Create Account"
        onPress={onRegisterPress}
      />
    </View>
  );
}