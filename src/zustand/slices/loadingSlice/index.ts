// slices/authSlice.ts
import { StateCreator } from 'zustand';
import { LoadingSlice } from '@/zustand/types';

export const createLoadingSlice: StateCreator<LoadingSlice> = (set) => ({
  loading: true,
  setIsLoading: (loading: boolean) => set({ loading: loading }),
});
