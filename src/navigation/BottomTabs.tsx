import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import DashboardScreen from "../screens/dashboard/DashboardScreen";
import AttendanceScreen from "../screens/attendance/AttendanceScreen";
import AnalyticsScreen from "../screens/analytics/AnalyticsScreen";
import GpaScreen from "../screens/gpa/GpaScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
  height: 65,
  paddingBottom: 8,
  backgroundColor: "#0F172A",
},

tabBarActiveTintColor: "#38BDF8",

tabBarInactiveTintColor: "#94A3B8",
          tabBarIcon: ({ color, size }) => {
            let iconName: any;

            switch (route.name) {
              case "Dashboard":
                iconName = "home";
                break;

              case "Attendance":
                iconName = "calendar";
                break;

              case "Analytics":
                iconName = "bar-chart";
                break;

              case "GPA":
                iconName = "school";
                break;

              default:
                iconName = "settings";
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },

          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
        />

        <Tab.Screen
          name="Attendance"
          component={AttendanceScreen}
        />

        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
        />

        <Tab.Screen
          name="GPA"
          component={GpaScreen}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}