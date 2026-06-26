import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { theme } from '../../config/theme';
import { useAcademicStore } from '../../store';

export const SetupSemesterScreen = ({ navigation }: any) => {
  const { setActiveSemesterId } = useAcademicStore();

  const handleCompleteSetup = () => {
    // Set a dummy semester ID to trigger the navigation guard transition
    setActiveSemesterId('temp-sem-1');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Semester & Subjects</Text>
      <Text style={styles.subtitle}>Define periods per day, subjects, and weekly timetable.</Text>
      <Button
        title="Complete Setup"
        color={theme.colors.primary}
        onPress={handleCompleteSetup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
});
