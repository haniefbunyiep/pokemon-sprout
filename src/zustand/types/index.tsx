export interface LoadingSlice {
  loading: boolean;
  error: 'error' | 'success' | 'pending';
  setIsLoading: (loading: boolean) => void;
  setIsError: (error: 'error' | 'success' | 'pending') => void;
}

export type StoreState = LoadingSlice;
