'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetPokemonList } from '@/services/pokemon/hooks/useGetPokemonList';
import PokemonCard from '@/app/_components/PokemonCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLoadingWithTimeout } from '@/services/pokemon/hooks/useLoadingWithTimeout';

export default function PokemonList() {
  useLoadingWithTimeout(2000, false, 'success');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPage =
        Number(searchParams.get('page')) ||
        Number(localStorage.getItem('latestPage')) ||
        1;
      setPage(savedPage);
    }
  }, [searchParams]);

  const { pokemonListData } = useGetPokemonList(page, limit);
  const { pokemonDetails, totalPages = 1 } = pokemonListData || {};

  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.replace(`?page=${page}`);
      localStorage.setItem('latestPage', page.toString());
    }
  }, [page, router]);

  return (
    <div className='flex justify-center bg-global-bg-white lg:px-10 xl:px-32'>
      <div className='flex min-h-screen w-full max-w-7xl flex-col bg-white bg-global-bg-white p-4'>
        <div className='grid flex-grow gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {pokemonDetails?.map((pokemon) => (
            <Link href={`/pokemon/${pokemon.name}`} key={pokemon.id}>
              <PokemonCard
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
                types={pokemon.types}
                colorClass={pokemon.colorClass}
              />
            </Link>
          ))}
        </div>

        <div className='mt-4 flex justify-center'>
          <Pagination className='flex items-center space-x-2'>
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`w-24 px-4 py-2 text-sm sm:text-base ${
                page === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              Previous
            </Button>

            <PaginationContent className='flex items-center space-x-2'>
              {page > 2 && (
                <div className='hidden sm:flex'>
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {page > 3 && <span className='px-2'>...</span>}
                </div>
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
                <div className='hidden sm:flex'>
                  {page < totalPages - 2 && <span className='px-2'>...</span>}
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </div>
              )}
            </PaginationContent>

            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`w-24 px-4 py-2 text-sm sm:text-base ${
                page === totalPages ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              Next
            </Button>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
