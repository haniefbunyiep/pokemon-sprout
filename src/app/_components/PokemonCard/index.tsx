import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { PokemonData } from '@/services/pokemon/api/useGetPokemonListQuery';
import { Badge } from '@/components/ui/badge';

const PokemonCard: React.FC<PokemonData> = ({
  id,
  name,
  imageUrl,
  types,
  colorClass,
}) => {
  return (
    <Card
      className={`relative flex h-[300px] w-full flex-col items-center justify-between rounded-lg px-4 py-6 shadow-md ${colorClass}`}
    >
      <div className='flex flex-col items-center'>
        <h2 className='mb-2 text-center text-xl font-bold capitalize text-white'>
          {name}
        </h2>
        <div className='flex flex-wrap justify-center gap-2'>
          {types.map((type) => (
            <Badge
              key={type}
              className={`bg-type-${type.toLowerCase()} cursor-default rounded-lg px-3 py-1 text-white shadow-sm`}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
      <div className=''>
        <Image
          src={imageUrl}
          alt={name}
          width={150}
          height={150}
          className='object-contain'
        />
      </div>
    </Card>
  );
};

export default PokemonCard;
