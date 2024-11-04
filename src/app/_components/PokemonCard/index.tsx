import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { PokemonData } from '@/services/pokemon/api/useGetPokemonListQuery';
import { Badge } from '@/components/ui/badge';

const PokemonCard: React.FC<PokemonData> = ({ id, name, imageUrl, types }) => {
  return (
    <Card className='flex h-[450px] flex-col justify-between rounded-lg bg-white p-4 text-gray-800 shadow-md'>
      <div className='flex flex-col items-center'>
        <p className='mb-1 text-sm text-gray-500'>
          #{id.toString().padStart(4, '0')}
        </p>
        <div className='flex h-[300px] w-full items-center justify-center bg-slate-100'>
          <Image
            src={imageUrl}
            alt={name}
            width={150}
            height={150}
            className='object-cover'
          />
        </div>
        <h3 className='mt-2 text-center text-xl font-bold capitalize'>
          {name}
        </h3>
      </div>
      <div className='mt-2 flex justify-center space-x-2'>
        {types.map((type) => (
          <Badge key={type} className={`bg-type-${type.toLowerCase()}`}>
            {type}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default PokemonCard;
