import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import SemesterSetupScreen from "../screens/SemesterSetupScreen";
import AddSubjectScreen from "../screens/AddSubjectScreen";
import DashboardScreen from "../screens/DashboardScreen";
import DailyAttendanceScreen from "../screens/DailyAttendanceScreen";


const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
  screenOptions={{
    headerShown: false,
  }}
>
  <Stack.Screen
    name="Login"
    component={LoginScreen}
  />

  <Stack.Screen
    name="SemesterSetup"
    component={SemesterSetupScreen}
  />

  <Stack.Screen
    name="AddSubject"
    component={AddSubjectScreen}
  />

  <Stack.Screen
    name="Dashboard"
    component={DashboardScreen}
  />

  <Stack.Screen
    name="DailyAttendance"
    component={DailyAttendanceScreen}
  />
</Stack.Navigator>
    </NavigationContainer>
  );
}