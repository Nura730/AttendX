import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { theme } from '../../config/theme';

export const SetupAcademicYearScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Academic Year</Text>
      <Text style={styles.subtitle}>Let's start by defining your academic year.</Text>
      <Button
        title="Next: Setup Semester"
        color={theme.colors.primary}
        onPress={() => navigation.navigate('SetupSemester')}
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
