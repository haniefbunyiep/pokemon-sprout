import { useEffect } from 'react';
import { useGetPokemonDetailQuery } from '../api/useGetPokemonDetailQuery';
import useStore from '@/zustand';

export const useGetPokemonDetail = (name: string) => {
  const { setIsLoading, setIsError } = useStore();
  const timeoutDuration = 2000;

  const {
    data: pokemonDetailData,
    isLoading: pokemonDetailLoading,
    status: PokemonDetailStatus,
    error,
  } = useGetPokemonDetailQuery(name);

  useEffect(() => {
    setIsLoading(true);
    setIsError('pending');

    const timeout = setTimeout(() => {
      if (PokemonDetailStatus !== 'success') {
        setIsError('error');
        setIsLoading(false);
        console.error('Request timed out');
      }
    }, timeoutDuration);

    if (PokemonDetailStatus === 'success') {
      clearTimeout(timeout);
      setIsError('success');
      setIsLoading(false);
    } else if (PokemonDetailStatus === 'error') {
      clearTimeout(timeout);
      setIsError('error');
      setIsLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [PokemonDetailStatus, setIsError, setIsLoading, timeoutDuration]);

  return {
    pokemonDetailData,
    pokemonDetailLoading,
    PokemonDetailStatus,
    error,
  };
};
