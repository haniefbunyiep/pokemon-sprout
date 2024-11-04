'use client';

import Loading from '../Loading';
import useStore from '@/zustand';

const FullScreenLoader = () => {
  const { loading } = useStore();

  console.log(loading);
  if (loading === true) {
    return (
      <div className='fixed inset-0 z-50 flex h-screen items-center justify-center bg-white'>
        <Loading />
      </div>
    );
  }

  return null;
};

export default FullScreenLoader;
