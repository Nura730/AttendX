import { create } from 'zustand';

interface SnackbarConfig {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface UIState {
  isGlobalLoading: boolean;
  snackbar: SnackbarConfig;
  setGlobalLoading: (loading: boolean) => void;
  showSnackbar: (message: string, type?: SnackbarConfig['type']) => void;
  hideSnackbar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isGlobalLoading: false,
  snackbar: {
    visible: false,
    message: '',
    type: 'info',
  },
  setGlobalLoading: (isGlobalLoading) => set({ isGlobalLoading }),
  showSnackbar: (message, type = 'info') => set({
    snackbar: { visible: true, message, type }
  }),
  hideSnackbar: () => set((state) => ({
    snackbar: { ...state.snackbar, visible: false }
  })),
}));
