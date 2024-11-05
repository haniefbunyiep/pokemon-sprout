'use client';

import { useLoadingWithTimeout } from '@/services/pokemon/hooks/useLoadingWithTimeout';
import { useParams, usePathname } from 'next/navigation';
import { useGetPokemonDetail } from '@/services/pokemon/hooks/useGetPokemonDetail';
import FirstCapital from '@/utlis/FirstCapital';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface NavContentProps {
  name: string;
  url: string;
}

interface PokemonLayoutProps {
  children: ReactNode;
}

export default function PokemonLayout({ children }: PokemonLayoutProps) {
  useLoadingWithTimeout(2000, false, 'success');
  const { name } = useParams();
  const pathname = usePathname();

  const navContent: NavContentProps[] = [
    { name: 'About', url: `/pokemon/${name}` },
    { name: 'Base Stats', url: `/pokemon/${name}/stats` },
    { name: 'Moves', url: `/pokemon/${name}/moves` },
  ];

  const { pokemonDetailData } = useGetPokemonDetail(
    name?.toString().toLowerCase() || '',
  );

  const About = pokemonDetailData?.about;

  const [latestPage, setLatestPage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPage = localStorage.getItem('latestPage');
      setLatestPage(storedPage || '1');
    }
  }, []);

  return (
    <div className={`flex justify-center bg-global-bg-white lg:px-32`}>
      <div
        className={`flex min-h-screen w-full max-w-7xl flex-col ${About?.colorClass} `}
      >
        <div
          className={`flex h-[150px] w-full flex-col items-center justify-center gap-3 py-2`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/?page=${latestPage}`}
                  className='font-semibold text-white'
                >
                  Pokemon
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-black' />
              <BreadcrumbItem>
                <BreadcrumbPage>{FirstCapital(name as string)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='text-[24px] text-white'>
            #{About?.id?.toString().padStart(4, '0') || '0001'}
          </div>
          <div>{FirstCapital(name as string)}</div>
          <div className='flex items-center gap-2'>
            {About?.types?.map((type) => (
              <Badge
                key={type}
                className={`bg-type-${type.toLowerCase()} cursor-default rounded-lg px-3 py-1 text-white shadow-sm`}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
        <div
          className={`relative flex h-fit min-h-[450px] items-center justify-center`}
        >
          <Image
            src={About?.imageUrl || '/pokemon-logo.png'}
            alt={About?.name || 'Pokemon Image'}
            width={450}
            height={450}
            className='absolute -bottom-10 object-contain'
          />
        </div>
        <div className='flex h-full flex-col gap-4 rounded-t-[24px] border border-white bg-white p-10 text-black'>
          <div className='flex items-center justify-center gap-14'>
            {navContent.map((content) => (
              <Link href={content.url} key={content.name}>
                <div
                  className={`${
                    pathname === content.url ? 'text-black' : 'text-slate-400'
                  }`}
                >
                  {content.name}
                </div>
              </Link>
            ))}
          </div>
          <Separator />
          <div className='flex h-full items-center justify-center'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
