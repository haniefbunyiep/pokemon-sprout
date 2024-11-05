'use client';

import { useLoadingWithTimeout } from '@/services/pokemon/hooks/useLoadingWithTimeout';
import { useParams } from 'next/navigation';
import { useGetPokemonDetail } from '@/services/pokemon/hooks/useGetPokemonDetail';

export default function Moves() {
  useLoadingWithTimeout(2000, false, 'success');
  const { name } = useParams();
  const { pokemonDetailData } = useGetPokemonDetail(
    name?.toString().toLowerCase() || '',
  );

  const moves = pokemonDetailData?.moves || [];

  return (
    <div className='flex w-full flex-col gap-6 p-6'>
      <div className='max-h-[400px] overflow-y-auto'>
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
          {moves.map((move, index) => (
            <div
              key={index}
              className='cursor-default rounded-md bg-gray-100 p-2 text-center text-sm font-medium text-gray-800'
            >
              {move.replace('-', ' ')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
