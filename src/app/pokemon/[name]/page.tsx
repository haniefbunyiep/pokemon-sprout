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
    <div className='flex w-fit flex-col gap-10 lg:p-4'>
      {navContent.map((item) => (
        <div key={item.key} className='flex justify-between gap-20'>
          <div className='font-bold'>{item.label}:</div>
          <div>
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
