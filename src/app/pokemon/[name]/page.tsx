'use client';

import { useLoadingWithTimeout } from '@/services/pokemon/hooks/useLoadingWithTimeout';
import { useParams } from 'next/navigation';
import { useGetPokemonDetail } from '@/services/pokemon/hooks/useGetPokemonDetail';
import FirstCapital from '@/utlis/FirstCapital';

interface NavContentProps {
  label: string;
  key: 'species' | 'height' | 'weight' | 'abilities';
}

const navContent: NavContentProps[] = [
  { label: 'Species', key: 'species' },
  { label: 'Height', key: 'height' },
  { label: 'Weight', key: 'weight' },
  { label: 'Abilities', key: 'abilities' },
];

export default function Pokemon() {
  useLoadingWithTimeout(2000, false, 'success');
  const { name } = useParams();
  const { pokemonDetailData } = useGetPokemonDetail(
    name?.toString().toLowerCase() || '',
  );

  const About = pokemonDetailData?.about;

  return (
    <div className='flex w-full max-w-md flex-col gap-6 p-4 sm:max-w-lg lg:max-w-xl'>
      {navContent.map((item) => (
        <div
          key={item.key}
          className='flex flex-col items-start justify-between gap-1 sm:flex-row sm:gap-4'
        >
          <div className='text-sm font-bold sm:text-base'>{item.label}:</div>
          <div className='text-sm sm:text-base'>
            {item.key === 'abilities'
              ? About?.abilities.join(', ')
              : item.key === 'species'
                ? FirstCapital(About?.species || '')
                : About?.[item.key]}
          </div>
        </div>
      ))}
    </div>
  );
}
