import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../../config/theme';

export const TimetableScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Timetable</Text>
      <Text style={styles.subtitle}>View and manage your schedule.</Text>
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
  },
});
