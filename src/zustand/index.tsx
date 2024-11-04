import { create } from 'zustand';
import { StoreState } from './types';
import { createLoadingSlice } from './slices/loadingSlice';

const useStore = create<StoreState>((...a) => ({
  ...createLoadingSlice(...a),
}));

export default useStore;
