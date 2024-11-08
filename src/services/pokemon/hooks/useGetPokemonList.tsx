import { useEffect } from 'react';
import { useGetPokemonListQuery } from '../api/useGetPokemonListQuery';
import useStore from '@/zustand';

export const useGetPokemonList = (page: number, limit: number) => {
  const { setIsLoading, setIsError } = useStore();
  const timeoutDuration = 2000;

  const {
    data: pokemonListData,
    isLoading: pokemonListLoading,
    refetch: pokemonListRefetch,
    status: PokemonListStatus,
  } = useGetPokemonListQuery(page, limit);

  useEffect(() => {
    setIsLoading(true);
    setIsError('pending');

    const timeout = setTimeout(() => {
      if (PokemonListStatus !== 'success') {
        setIsError('error');
        setIsLoading(false);
        console.error('Request timed out');
      }
    }, timeoutDuration);

    if (PokemonListStatus === 'success') {
      clearTimeout(timeout);
      setIsError('success');
      setIsLoading(false);
    } else if (PokemonListStatus === 'error') {
      clearTimeout(timeout);
      setIsError('error');
      setIsLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [PokemonListStatus, setIsError, setIsLoading, timeoutDuration]);

  return {
    pokemonListData,
    pokemonListLoading,
    pokemonListRefetch,
    PokemonListStatus,
  };
};
