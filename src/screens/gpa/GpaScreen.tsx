import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useGPAStore } from "../../store/gpaStore";

import { calculateSGPA } from "../../utils/gpa";

export default function GpaScreen() {
  const { subjects, addSubject } =
    useGPAStore();

  const [name, setName] =
    useState("");

  const [credits, setCredits] =
    useState("");

  const [grade, setGrade] =
    useState("O");

  const sgpa =
    calculateSGPA(subjects);

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        🎓 GPA Calculator
      </Text>

      <TextInput
        placeholder="Course Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Credits"
        value={credits}
        onChangeText={setCredits}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Grade (O/A+/A/B+/B/C/U)"
        value={grade}
        onChangeText={setGrade}
        style={styles.input}
      />

      <Button
        title="Add Subject"
        onPress={() => {
          addSubject({
            id: Date.now().toString(),
            courseName: name,
            credits:
              Number(credits),
            grade,
          });

          setName("");
          setCredits("");
          setGrade("O");
        }}
      />

      <View style={styles.card}>
        <Text>
          Current SGPA
        </Text>

        <Text style={styles.sgpa}>
          {sgpa.toFixed(2)}
        </Text>
      </View>

      {subjects.map((subject) => (
        <View
          key={subject.id}
          style={styles.subject}
        >
          <Text>
            {subject.courseName}
          </Text>

          <Text>
            {subject.credits} Credits
          </Text>

          <Text>
            Grade: {subject.grade}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  card: {
    marginVertical: 20,
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#1E293B",
  },

  sgpa: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#38BDF8",
  },

  subject: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
});