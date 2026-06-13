import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";

import { Subject } from "../../types/subject";

import { useSubjectStore } from "../../store/subjectStore";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

export default function SubjectScreen() {
  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  const completeSetup =
    useSemesterStore(
      (state) => state.completeSetup
    );

  const subjects =
    useSubjectStore(
      (state) => state.subjects
    );

  const createSubject =
    useSubjectStore(
      (state) =>
        state.createSubject
    );

  const updateSubject =
    useSubjectStore(
      (state) =>
        state.updateSubject
    );

  const deleteSubject =
    useSubjectStore(
      (state) =>
        state.deleteSubject
    );

  const user = useAuthStore(
    (state) => state.user
  );

  const [editingId, setEditingId] =
    useState<string | null>(
      null
    );

  const [name, setName] =
    useState("");

  const [code, setCode] =
    useState("");

  const [
    targetAttendance,
    setTargetAttendance,
  ] = useState("75");

  const resetForm = () => {
    setEditingId(null);

    setName("");

    setCode("");

    setTargetAttendance("75");
  };

  const handleAddOrUpdate =
    async () => {
      if (!user) return;

      if (!semester) {
        Alert.alert(
          "Error",
          "No active semester"
        );
        return;
      }

      if (!name.trim()) {
        Alert.alert(
          "Error",
          "Enter subject name"
        );
        return;
      }

      try {
        if (editingId) {
          const existing =
            subjects.find(
              (s) =>
                s.id === editingId
            );

          if (!existing) {
            return;
          }

          const updated: Subject =
            {
              ...existing,

              name,

              code,

              targetAttendance:
                Number(
                  targetAttendance
                ),
            };

          await updateSubject(
            updated,
            user.uid,
            semester.id
          );

          Alert.alert(
            "Success",
            "Subject Updated"
          );
        } else {
          const subject: Subject =
            {
              id:
                Date.now().toString(),

              name,

              code,

              totalPeriods: 0,

              attendedPeriods: 0,

              targetAttendance:
                Number(
                  targetAttendance
                ),

              isActive: true,

              createdAt:
                new Date().toISOString(),
            };

          await createSubject(
            subject,
            user.uid,
            semester.id
          );

          Alert.alert(
            "Success",
            "Subject Added"
          );
        }

        resetForm();
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  const handleEdit = (
    subject: Subject
  ) => {
    setEditingId(subject.id);

    setName(subject.name);

    setCode(subject.code || "");

    setTargetAttendance(
      String(
        subject.targetAttendance
      )
    );
  };

  const handleDelete =
    async (
      subjectId: string
    ) => {
      if (
        !user ||
        !semester
      ) {
        return;
      }

      try {
        await deleteSubject(
          subjectId,
          user.uid,
          semester.id
        );

        Alert.alert(
          "Success",
          "Subject Deleted"
        );
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  const handleDoneSetup =
    async () => {
      if (!user) return;

      if (!semester) return;

      if (
        subjects.length === 0
      ) {
        Alert.alert(
          "Error",
          "Add at least one subject"
        );
        return;
      }

      try {
        await completeSetup(
          user.uid
        );

        Alert.alert(
          "Success",
          "Setup Completed"
        );
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        {editingId
          ? "Edit Subject"
          : "Add Subjects"}
      </Text>

      <TextInput
        placeholder="Subject Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Subject Code"
        value={code}
        onChangeText={setCode}
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Target Attendance %"
        value={targetAttendance}
        onChangeText={
          setTargetAttendance
        }
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 12,
        }}
      />

      <Button
        title={
          editingId
            ? "Update Subject"
            : "Add Subject"
        }
        onPress={
          handleAddOrUpdate
        }
      />

      {editingId && (
        <Button
          title="Cancel Edit"
          onPress={resetForm}
        />
      )}

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Subjects Added
      </Text>

      {subjects.map(
        (subject) => (
          <View
            key={subject.id}
            style={{
              borderWidth: 1,
              padding: 12,
              borderRadius: 8,
              gap: 8,
            }}
          >
            <Text>
              {subject.name}
            </Text>

            <Text>
              Code:{" "}
              {subject.code}
            </Text>

            <Text>
              Target:{" "}
              {
                subject.targetAttendance
              }
              %
            </Text>

            <Button
              title="Edit"
              onPress={() =>
                handleEdit(
                  subject
                )
              }
            />

            <Button
              title="Delete"
              onPress={() =>
                handleDelete(
                  subject.id
                )
              }
            />
          </View>
        )
      )}

      <Button
        title="Done Setup"
        onPress={
          handleDoneSetup
        }
      />
    </ScrollView>
  );
}