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
  onLoginPress: () => void;
}

export default function RegisterScreen({
  onLoginPress,
}: Props) {
  const register =
    useAuthStore(
      (state) => state.register
    );

  const loading = useAuthStore(
    (state) => state.loading
  );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async () => {
      try {
        await register(
          email,
          password
        );
      } catch (error: any) {
        Alert.alert(
          "Registration Failed",
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
        Create Account
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
            : "Register"
        }
        onPress={handleRegister}
      />

      <Button
        title="Back To Login"
        onPress={onLoginPress}
      />
    </View>
  );
}