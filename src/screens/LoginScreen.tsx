import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { useSemesterStore } from "../store/semesterStore";


export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const createUser =
    useSemesterStore(
      (state) => state.createUser
    );

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const handleContinue = () => {
    if (!name.trim()) {
      Alert.alert(
        "Error",
        "Enter your name"
      );
      return;
    }

    if (!email.trim()) {
      Alert.alert(
        "Error",
        "Enter your email"
      );
      return;
    }

    const userId = `USR-${Date.now()}`;

    createUser(
      userId,
      name,
      email
    );

    navigation.replace(
      "SemesterSetup"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        AttendX
      </Text>

      <Text style={styles.subtitle}>
        Create Account
      </Text>

      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },

    title: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },

    subtitle: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 30,
    },

    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 14,
      marginBottom: 15,
    },

    button: {
      backgroundColor: "#2563eb",
      padding: 15,
      borderRadius: 10,
    },

    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 16,
    },
  });