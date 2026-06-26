import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SetupAcademicYearScreen } from '../screens/onboarding/SetupAcademicYearScreen';
import { SetupSemesterScreen } from '../screens/onboarding/SetupSemesterScreen';
import { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SetupAcademicYear" component={SetupAcademicYearScreen} />
      <Stack.Screen name="SetupSemester" component={SetupSemesterScreen} />
    </Stack.Navigator>
  );
};
