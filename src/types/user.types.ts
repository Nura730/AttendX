export interface UserProfile {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  attendanceGoal: number; // e.g. 75
  theme: 'dark' | 'light' | 'system';
  notificationsEnabled: boolean;
  appVersion: string;
}
