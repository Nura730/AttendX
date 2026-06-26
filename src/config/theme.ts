import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: {
    // Premium dark mode base colors
    background: '#0B0F19', // Deep dark midnight blue
    surface: '#151D30',    // Dark card surface
    surfaceLight: '#1E2942', // Slightly lighter dark surface
    
    // Glassmorphism overlays (to be paired with blur)
    glassBackground: 'rgba(21, 29, 48, 0.65)',
    glassBackgroundLight: 'rgba(30, 41, 66, 0.45)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
    glassBorderActive: 'rgba(99, 102, 241, 0.3)', // Indigo tint border

    // Core branding colors
    primary: '#6366F1',      // Vibrant Indigo
    primaryLight: '#818CF8', // Light Indigo for accents
    primaryDark: '#4F46E5',  // Deep Indigo
    secondary: '#10B981',    // Emerald Green
    accent: '#8B5CF6',       // Purple/Violet for premium feel

    // Semantic attendance status colors
    present: '#10B981',      // Emerald Green
    absent: '#EF4444',       // Vibrant Rose/Red
    od: '#F59E0B',           // Amber/Yellow
    leave: '#3B82F6',        // Blue
    holiday: '#8B5CF6',      // Purple
    cancelled: '#6B7280',    // Cool Gray

    // Text hierarchy
    text: {
      primary: '#F3F4F6',    // Near white
      secondary: '#9CA3AF',  // Muted gray
      muted: '#6B7280',      // Darker gray for inactive elements
      inverse: '#0B0F19',    // Text on light backgrounds
      present: '#34D399',
      absent: '#F87171',
    },

    // Shadow & Elevation
    shadow: 'rgba(0, 0, 0, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },

  // Material 3 inspired spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
    huge: 64,
  },

  // Consistent corner radiuses
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 9999,
  },

  // Typography system
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      semibold: 'System',
      bold: 'System',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
      huge: 40,
    },
    lineHeights: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 38,
    },
  },

  // Device layout presets
  dimensions: {
    width,
    height,
    isSmallDevice: width < 375,
  },

  // Reusable Glassmorphism shadow and borders
  glassmorphism: {
    card: {
      backgroundColor: 'rgba(21, 29, 48, 0.65)',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 4,
    },
    cardLight: {
      backgroundColor: 'rgba(30, 41, 66, 0.45)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
};

export type ThemeType = typeof theme;
