import { AxiosInstance } from '@/config/AxiosInstance';
import { useQuery } from '@tanstack/react-query';

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonMove {
  move: {
    name: string;
  };
}

interface PokemonSpecies {
  name: string;
}

interface PokemonDetailsResponse {
  id: number;
  name: string;
  types: PokemonType[];
  species: PokemonSpecies;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
}

export interface PokemonDetailData {
  about: {
    id: number;
    name: string;
    imageUrl: string;
    types: string[];
    species: string;
    height: number;
    weight: number;
    abilities: string[];
    colorClass: string;
  };
  baseStats: {
    name: string;
    value: number;
  }[];
  evolution: string[];
  moves: string[];
}

const fetchPokemonDetail = async (name: string): Promise<PokemonDetailData> => {
  const { data } = await AxiosInstance.get<PokemonDetailsResponse>(
    `/pokemon/${name}`,
  );

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
  const types = data.types.map((typeInfo) => typeInfo.type.name);
  const abilities = data.abilities.map(
    (abilityInfo) => abilityInfo.ability.name,
  );

  const primaryType = types[0].toLowerCase();
  const colorClass = `pokemon-bg-${primaryType}`;

  const baseStats = data.stats.map((statInfo) => ({
    name: statInfo.stat.name,
    value: statInfo.base_stat,
  }));

  const moves = data.moves.map((moveInfo) => moveInfo.move.name);

  const evolution = ['Evolution 1', 'Evolution 2'];

  return {
    about: {
      id: data.id,
      name: data.name,
      imageUrl,
      types,
      species: data.species.name,
      height: data.height,
      weight: data.weight,
      abilities,
      colorClass,
    },
    baseStats,
    evolution,
    moves,
  };
};

export const useGetPokemonDetailQuery = (name: string) => {
  return useQuery<PokemonDetailData>({
    queryKey: ['pokemon-detail', name],
    queryFn: () => fetchPokemonDetail(name),
  });
};
