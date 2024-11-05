import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex h-20 w-screen items-center justify-center bg-white text-3xl font-bold'>
      <Link href={'/'}>
        <Image
          src='/pokemon-logo.png'
          alt='logo'
          width={100}
          height={100}
        ></Image>
      </Link>
    </div>
  );
}
