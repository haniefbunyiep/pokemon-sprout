import { FaGithub, FaInstagram, FaLinkedinIn, FaCode } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-white'>
      <div className='container mx-auto flex flex-col p-4 dark:divide-gray-600 md:p-8 lg:flex-row'>
        <div className='space-y-4 self-center py-6 text-center sm:flex sm:justify-around sm:space-x-4 sm:space-y-0 lg:flex-1 lg:justify-start'>
          <div className='text-3xl font-bold'>@haniefbunyiep</div>
        </div>
        <div className='flex flex-col justify-center pt-6 lg:pt-0'>
          <div className='flex justify-center space-x-4'>
            <Link href={'https://www.linkedin.com/in/hanief-burhanuddin/'}>
              <Button className='h-14 w-14 rounded-full border py-0'>
                <FaLinkedinIn size={30} />
              </Button>
            </Link>
            <Link href={'https://github.com/haniefbunyiep'}>
              <Button className='h-14 w-14 rounded-full border py-0'>
                <FaGithub size={30} />
              </Button>
            </Link>
            <Link href={'https://www.instagram.com/haniefbunyiep/'}>
              <Button className='h-14 w-14 rounded-full border py-0'>
                <FaInstagram size={30} />
              </Button>
            </Link>
            <Link href={'https://haniefbunyiep-website.vercel.app/'}>
              <Button className='h-14 w-14 rounded-full border py-0'>
                <FaCode size={30} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
