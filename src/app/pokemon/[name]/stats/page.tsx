'use client';

import { useLoadingWithTimeout } from '@/services/pokemon/hooks/useLoadingWithTimeout';
import { useParams } from 'next/navigation';
import { useGetPokemonDetail } from '@/services/pokemon/hooks/useGetPokemonDetail';
import { Progress } from '@/components/ui/progress';

export default function BaseStats() {
  useLoadingWithTimeout(2000, false, 'success');
  const { name } = useParams();
  const { pokemonDetailData } = useGetPokemonDetail(
    name?.toString().toLowerCase() || '',
  );

  const BaseStats = pokemonDetailData?.baseStats;
  const maxStatValue = 150;

  return (
    <div className='flex w-full flex-col gap-6 lg:p-6'>
      {BaseStats?.map((stat) => (
        <div key={stat.name} className='flex items-center gap-4'>
          <span className='w-24 font-medium capitalize'>
            {stat.name.replace('-', ' ')}
          </span>
          <span className='w-12 text-right'>{stat.value}</span>
          <Progress
            value={stat.value}
            max={maxStatValue}
            className='h-2 flex-1 bg-gray-200'
            style={{
              backgroundColor: '#e2e8f0',
              height: '8px',
              borderRadius: '4px',
            }}
          />
        </div>
      ))}
    </div>
  );
}
