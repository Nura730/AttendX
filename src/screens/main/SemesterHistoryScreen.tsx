import React, {
  useEffect,
} from "react";

import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { useAuthStore } from "../../store/authStore";

import { useSemesterStore } from "../../store/semesterStore";

export default function SemesterHistoryScreen() {
  const user = useAuthStore(
    (state) => state.user
  );

  const semester =
    useSemesterStore(
      (state) => state.semester
    );

  const semesters =
    useSemesterStore(
      (state) => state.semesters
    );

  const loading =
    useSemesterStore(
      (state) => state.loading
    );

  const loadAllSemesters =
    useSemesterStore(
      (state) =>
        state.loadAllSemesters
    );

  useEffect(() => {
    if (!user) {
      return;
    }

    loadAllSemesters(
      user.uid
    );
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            "center",
          alignItems:
            "center",
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

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
        Semester History
      </Text>

      {semesters.map(
        (item) => (
          <View
            key={item.id}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight:
                  "bold",
              }}
            >
              {
                item.semesterName
              }
            </Text>

            <Text>
              Start:
              {" "}
              {
                item.startDate
              }
            </Text>

            <Text>
              End:
              {" "}
              {
                item.endDate
              }
            </Text>

            <Text>
              Status:
              {" "}
              {item.id === semester?.id
                ? "Current"
                : item.isActive
                ? "Active"
                : "Completed"}
            </Text>
          </View>
        )
      )}
    </ScrollView>
  );
}