'use client';

import Loading from '../Loading';
import useStore from '@/zustand';
import ErrorService from '../ErrorService';

const FullScreenLoader = () => {
  const { loading, error } = useStore();

  if (loading === true) {
    return (
      <div className='fixed inset-0 z-50 flex h-screen items-center justify-center bg-white'>
        <Loading />
      </div>
    );
  }

  if (error === 'error') {
    return (
      <div className='fixed inset-0 z-50 flex h-screen items-center justify-center bg-white'>
        <ErrorService />
      </div>
    );
  }

  return null;
};

export default FullScreenLoader;
