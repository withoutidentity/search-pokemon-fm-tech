'use client';

import Link from 'next/link';
import { memo } from 'react';
import { useQuery } from '@apollo/client';

import type {
  GetPokemonQuery,
  GetPokemonQueryVariables,
} from '@/graphql/__generated__/graphql';
import { GET_POKEMON } from '@/graphql/queries/getPokemon';
import { PokemonCard } from '@/components/pokemon/PokemonCard';
import { NotFound } from '@/components/pokemon/NotFound';
import { SearchInput } from '@/components/search/SearchInput';
import { Spinner } from '@/components/ui/Spinner';

interface PokemonDetailsProps {
  name: string;
}

function PokemonDetailsComponent({ name }: PokemonDetailsProps): JSX.Element {
  const normalizedName = name.trim().toLowerCase();
  const { data, error, loading } = useQuery<
    GetPokemonQuery,
    GetPokemonQueryVariables
  >(GET_POKEMON, {
    variables: {
      name: normalizedName,
    },
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <Spinner label="Loading Pokemon" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <section className="w-full max-w-xl rounded-lg bg-white p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
            Request failed
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            Could not load Pokemon
          </h1>
          <p className="mt-3 text-slate-600">{error.message}</p>
          <Link
            className="mt-6 inline-flex min-h-11 items-center rounded-md bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
            href="/"
          >
            Back to search
          </Link>
        </section>
      </main>
    );
  }

  if (!data?.pokemon) {
    return <NotFound name={normalizedName} />;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link className="text-lg font-bold text-slate-950" href="/">
            Home
          </Link>
          <SearchInput syncUrl={false} />
        </div>
      </header>
      <PokemonCard pokemon={data.pokemon} />
    </main>
  );
}

export const PokemonDetails = memo(PokemonDetailsComponent);
