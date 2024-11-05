import { useEffect } from 'react';
import { useGetPokemonListQuery } from '../api/useGetPokemonListQuery';
import useStore from '@/zustand';

export const useGetPokemonList = (page: number, limit: number) => {
  const {
    data: pokemonListData,
    isLoading: pokemonListLoading,
    refetch: pokemonListRefetch,
    status: PokemonListStatus,
  } = useGetPokemonListQuery(page, limit);

  const { setIsLoading, setIsError } = useStore();

  useEffect(() => {
    setIsLoading(pokemonListLoading);
    setIsError(PokemonListStatus);
  }, [pokemonListLoading, setIsLoading]);

  return {
    pokemonListData,
    pokemonListLoading,
    pokemonListRefetch,
    PokemonListStatus,
  };
};
