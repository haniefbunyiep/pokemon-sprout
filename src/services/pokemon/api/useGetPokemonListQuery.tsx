import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from '@/config/AxiosInstance';

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  types: PokemonType[];
}

export interface PokemonData {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  colorClass: string;
}

interface PokemonListResponse {
  results: { name: string; url: string }[];
  count: number;
}

interface PaginatedPokemonData {
  pokemonDetails: PokemonData[];
  totalCount: number;
  totalPages: number;
}

const fetchPokemonDetails = async (
  pokemonUrl: string,
): Promise<PokemonData> => {
  const { data } = await AxiosInstance.get<PokemonDetails>(pokemonUrl);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
  const types = data.types.map((typeInfo: PokemonType) => typeInfo.type.name);

  const primaryType = types[0].toLowerCase();
  const colorClass = `pokemon-bg-${primaryType}`;

  return {
    id: data.id,
    name: data.name,
    imageUrl,
    types,
    colorClass,
  };
};

const fetchPokemonList = async (
  page: number,
  limit: number,
): Promise<PaginatedPokemonData> => {
  const offset = (page - 1) * limit;
  const { data } = await AxiosInstance.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const details = await fetchPokemonDetails(pokemon.url);
      return details;
    }),
  );

  return {
    pokemonDetails,
    totalCount: data.count,
    totalPages: Math.ceil(data.count / limit),
  };
};

export const useGetPokemonListQuery = (page: number, limit: number) => {
  return useQuery<PaginatedPokemonData>({
    queryKey: ['pokemon-list', page, limit],
    queryFn: () => fetchPokemonList(page, limit),
  });
};
