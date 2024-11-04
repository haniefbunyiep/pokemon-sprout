export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center space-x-2 bg-white'>
      <div className='h-4 w-4 animate-pulse rounded-full bg-black'></div>
      <div className='h-4 w-4 animate-pulse rounded-full bg-black'></div>
      <div className='h-4 w-4 animate-pulse rounded-full bg-black'></div>
    </div>
  );
}
