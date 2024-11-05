import { useEffect } from 'react';
import useStore from '@/zustand';

export const useLoadingWithTimeout = (
  duration = 2000,
  loadingStatus?: boolean,
  errorStatus?: 'error' | 'success' | 'pending',
) => {
  const { setIsLoading, setIsError } = useStore();

  useEffect(() => {
    setIsLoading(true);
    setIsError('pending');

    const timeout = setTimeout(() => {
      setIsLoading(loadingStatus || false);
      setIsError(errorStatus || 'error');
    }, duration);

    return () => clearTimeout(timeout);
  }, [setIsLoading, setIsError, duration]);
};
