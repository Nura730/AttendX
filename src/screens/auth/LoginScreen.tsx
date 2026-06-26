import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuthStore } from '../../store';
import { theme } from '../../config/theme';

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  const { setUser, setLoading, isLoading, error, setError } = useAuthStore();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      setLoading(true);
      const credential = GoogleAuthProvider.credential(id_token);
      
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            attendanceGoal: 75,
            theme: 'dark',
            notificationsEnabled: true,
            appVersion: '1.0.0',
          });
        })
        .catch((err) => {
          console.error('Firebase Auth Error:', err);
          setError(err.message || 'Authentication failed');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AttendX</Text>
      <Text style={styles.subtitle}>Academic Planner & Attendance Tracker</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          disabled={!request}
          onPress={() => {
            setError(null);
            promptAsync();
          }}
        >
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </TouchableOpacity>
      )}
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
    fontSize: theme.typography.sizes.huge,
    color: theme.colors.text.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.md,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  errorText: {
    color: theme.colors.absent,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
});
