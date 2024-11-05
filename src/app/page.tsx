import PokemonList from '@/components/pages/Home';
import { Suspense } from 'react';
import Loading from '@/components/template/Loading';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <PokemonList />
    </Suspense>
  );
}
