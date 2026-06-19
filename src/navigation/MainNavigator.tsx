import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/main/DashboardScreen";
import AttendanceScreen from "../screens/main/AttendanceScreen";
import HistoryScreen from "../screens/main/HistoryScreen";
import SettingsScreen from "../screens/main/SettingsScreen";

const Tab =
  createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={
          DashboardScreen
        }
      />

      <Tab.Screen
        name="Attendance"
        component={
          AttendanceScreen
        }
      />

      <Tab.Screen
        name="History"
        component={
          HistoryScreen
        }
      />

      <Tab.Screen
        name="Settings"
        component={
          SettingsScreen
        }
      />
    </Tab.Navigator>
  );
}