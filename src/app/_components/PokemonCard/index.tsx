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
  console.log(colorClass);
  return (
    <Card className={`relative flex h-[300px] gap-4 px-8 py-14 ${colorClass}`}>
      <div className='flex flex-col gap-5'>
        <div className='text-center text-xl font-bold capitalize'>{name}</div>
        <div className='flex flex-col items-center gap-3'>
          {types.map((type) => (
            <Badge
              key={type}
              className={`bg-type-${type.toLowerCase()} flex min-w-[70px] cursor-default items-center justify-center`}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
      <div className='absolute bottom-5 right-5'>
        <Image
          src={imageUrl}
          alt={name}
          width={150}
          height={150}
          className='object-cover'
        />
      </div>
    </Card>
  );
};

export default PokemonCard;
