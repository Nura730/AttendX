import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Calendar } from "react-native-calendars";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

import { Semester } from "../../types/semester";

export default function SemesterScreen() {
  const [semesterName, setSemesterName] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [
    startCalendarVisible,
    setStartCalendarVisible,
  ] = useState(false);

  const [
    endCalendarVisible,
    setEndCalendarVisible,
  ] = useState(false);

  const user = useAuthStore(
    (state) => state.user
  );

  const createSemester =
    useSemesterStore(
      (state) => state.createSemester
    );

  const handleSave =
    async () => {
      if (!user) {
        return;
      }

      if (
        !semesterName ||
        !startDate ||
        !endDate
      ) {
        Alert.alert(
          "Error",
          "Fill all fields"
        );
        return;
      }

      if (
        new Date(endDate) <=
        new Date(startDate)
      ) {
        Alert.alert(
          "Error",
          "End date must be after start date"
        );
        return;
      }

      const semester: Semester = {
        id: Date.now().toString(),

        semesterName,

        startDate,

        endDate,

        conductedPeriods: 0,

        isActive: true,

        setupCompleted: false,

        createdAt:
          new Date().toISOString(),
      };

      try {
        await createSemester(
          semester,
          user.uid
        );

        Alert.alert(
          "Success",
          "Semester Saved"
        );
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message
        );
      }
    };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          justifyContent:
            "center",
          gap: 12,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Semester Setup
        </Text>

        <TextInput
          placeholder="Semester Name"
          value={semesterName}
          onChangeText={
            setSemesterName
          }
          style={{
            borderWidth: 1,
            padding: 12,
            borderRadius: 8,
          }}
        />

        <TouchableOpacity
          onPress={() =>
            setStartCalendarVisible(
              true
            )
          }
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 8,
          }}
        >
          <Text>
            {startDate
              ? startDate
              : "Select Start Date"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setEndCalendarVisible(
              true
            )
          }
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 8,
          }}
        >
          <Text>
            {endDate
              ? endDate
              : "Select End Date"}
          </Text>
        </TouchableOpacity>

        <Button
          title="Save Semester"
          onPress={handleSave}
        />
      </ScrollView>

      <Modal
        visible={
          startCalendarVisible
        }
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            paddingTop: 60,
          }}
        >
          <Calendar
            onDayPress={(
              day
            ) => {
              setStartDate(
                day.dateString
              );

              setStartCalendarVisible(
                false
              );
            }}
          />

          <Button
            title="Close"
            onPress={() =>
              setStartCalendarVisible(
                false
              )
            }
          />
        </View>
      </Modal>

      <Modal
        visible={
          endCalendarVisible
        }
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            paddingTop: 60,
          }}
        >
          <Calendar
            onDayPress={(
              day
            ) => {
              setEndDate(
                day.dateString
              );

              setEndCalendarVisible(
                false
              );
            }}
          />

          <Button
            title="Close"
            onPress={() =>
              setEndCalendarVisible(
                false
              )
            }
          />
        </View>
      </Modal>
    </>
  );
}