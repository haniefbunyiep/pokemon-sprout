export interface LoadingSlice {
  loading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export type StoreState = LoadingSlice;
