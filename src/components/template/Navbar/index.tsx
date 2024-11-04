import Image from 'next/image';

export default function Navbar() {
  return (
    <div className='flex h-20 w-screen items-center justify-center bg-white text-3xl font-bold'>
      <Image
        src='/pokemon-logo.png'
        alt='logo'
        width={100}
        height={100}
      ></Image>
    </div>
  );
}
