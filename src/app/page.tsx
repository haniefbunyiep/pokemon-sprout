'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetPokemonList } from '@/services/pokemon/hooks/useGetPokemonList';
import PokemonCard from './_components/PokemonCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PokemonList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage =
    Number(searchParams.get('page')) ||
    Number(localStorage.getItem('latestPage')) ||
    1;
  const [page, setPage] = useState(initialPage);
  const limit = 20;

  const { pokemonListData } = useGetPokemonList(page, limit);
  const { pokemonDetails, totalPages = 1 } = pokemonListData || {};

  useEffect(() => {
    router.replace(`?page=${page}`);
    localStorage.setItem('latestPage', page.toString());
  }, [page, router]);

  return (
    <main className='flex justify-center bg-global-bg-white px-32'>
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
