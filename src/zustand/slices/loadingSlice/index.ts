import { StateCreator } from 'zustand';
import { LoadingSlice } from '@/zustand/types';

export const createLoadingSlice: StateCreator<LoadingSlice> = (set) => ({
  loading: true,
  error: 'pending',
  setIsLoading: (loading: boolean) => set({ loading: loading }),
  setIsError: (error: 'error' | 'success' | 'pending') => set({ error: error }),
});
