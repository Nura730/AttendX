import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { theme } from '../../config/theme';
import { useAuthStore, useAcademicStore } from '../../store';

export const SettingsScreen = () => {
  const { logout } = useAuthStore();
  const { resetAcademicStore } = useAcademicStore();

  const handleLogout = async () => {
    await logout();
    resetAcademicStore();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Manage goals, themes, notifications, and logout.</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          color={theme.colors.absent}
          onPress={handleLogout}
        />
      </View>
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
  buttonContainer: {
    width: '100%',
    marginTop: theme.spacing.xl,
  },
});
