'use client';

import { useState } from 'react';
import { useGetPokemonList } from '@/services/pokemon/hooks/useGetPokemonList';
import PokemonCard from './_components/PokemonCard';
import Loading from '@/components/template/Loading';
import ErrorService from '@/components/template/ErrorService';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

export default function PokemonList() {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { pokemonListData, pokemonListLoading, PokemonListStatus } =
    useGetPokemonList(page, limit);

  if (pokemonListLoading) return <Loading />;
  if (PokemonListStatus === 'error') return <ErrorService />;

  const { pokemonDetails, totalPages = 1 } = pokemonListData || {};

  return (
    <main className='flex justify-center bg-global-bg-white px-32'>
      <div className='flex min-h-screen w-full max-w-7xl flex-col bg-white bg-global-bg-white p-4'>
        <div className='grid flex-grow gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {pokemonDetails?.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              types={pokemon.types}
            />
          ))}
        </div>

        <div className='mt-4 flex justify-center'>
          <Pagination className='flex items-center space-x-2'>
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 ${page === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Previous
            </Button>

            <PaginationContent className='flex items-center space-x-2'>
              {page > 2 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {page > 3 && <span className='px-2'>...</span>}
                </>
              )}

              {page > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page - 1)}>
                    {page - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <span className='rounded bg-black px-4 py-2 font-semibold text-white'>
                  {page}
                </span>
              </PaginationItem>

              {page < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPage(page + 1)}>
                    {page + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {page < totalPages - 1 && (
                <>
                  {page < totalPages - 2 && <span className='px-2'>...</span>}
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
            </PaginationContent>

            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 ${page === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Next
            </Button>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
