'use client';

import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import type {
  GetPokemonQuery,
  GetPokemonQueryVariables,
} from '@/graphql/__generated__/graphql';
import { GET_POKEMON } from '@/graphql/queries/getPokemon';

interface PokemonSearchState {
  searchPokemon: (name: string) => Promise<void>;
  pokemon: GetPokemonQuery['pokemon'];
  loading: boolean;
  errorMessage: string | null;
}

export function usePokemonSearch(): PokemonSearchState {
  const [runSearch, { data, loading, error }] = useLazyQuery<
    GetPokemonQuery,
    GetPokemonQueryVariables
  >(GET_POKEMON, {
    fetchPolicy: 'network-only',
  });

  const searchPokemon = useCallback(
    async (name: string): Promise<void> => {
      const normalizedName = name.trim().toLowerCase();

      if (!normalizedName) {
        return;
      }

      await runSearch({
        variables: {
          name: normalizedName,
        },
      });
    },
    [runSearch],
  );

  return {
    searchPokemon,
    pokemon: data?.pokemon ?? null,
    loading,
    errorMessage: error?.message ?? null,
  };
}
