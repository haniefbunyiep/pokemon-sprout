'use client';

import { useEffect } from 'react';

export default function AppWrapper({ children }: any) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('latestPage');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
}
