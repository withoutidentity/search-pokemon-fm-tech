'use client';

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { FormEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';

import type {
  GetPokemonNamesQuery,
  GetPokemonNamesQueryVariables,
} from '@/graphql/__generated__/graphql';
import { GET_POKEMON_NAMES } from '@/graphql/queries/getPokemon';
import { useSearchParam } from '@/lib/hooks/useSearchParam';
import {
  getRecentPokemonSearches,
  saveRecentPokemonSearch,
} from '@/lib/pokemon/recentSearches';

interface SearchInputProps {
  syncUrl?: boolean;
}

function SearchInputComponent({ syncUrl = true }: SearchInputProps): JSX.Element {
  const router = useRouter();
  const { value, setValue } = useSearchParam('q');
  const { data: pokemonNamesData } = useQuery<
    GetPokemonNamesQuery,
    GetPokemonNamesQueryVariables
  >(GET_POKEMON_NAMES, {
    variables: {
      first: 151,
    },
    fetchPolicy: 'cache-first',
  });
  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [recentPokemon, setRecentPokemon] = useState<string[]>([]);

  useEffect((): void => {
    setInputValue(value);
  }, [value]);

  useEffect((): (() => void) => {
    if (!syncUrl) {
      return (): void => undefined;
    }

    const timer = window.setTimeout((): void => {
      setValue(inputValue);
    }, 300);

    return (): void => {
      window.clearTimeout(timer);
    };
  }, [inputValue, setValue, syncUrl]);

  const pokemonNames = useMemo(
    (): string[] => pokemonNamesData?.pokemons.map((pokemon) => pokemon.name) ?? [],
    [pokemonNamesData?.pokemons],
  );

  const visibleSuggestions = useMemo((): string[] => {
    const normalizedInput = inputValue.trim().toLowerCase();

    if (!normalizedInput) {
      return recentPokemon;
    }

    const matchedNames = pokemonNames.filter((pokemonName) =>
      pokemonName.toLowerCase().startsWith(normalizedInput),
    );

    if (matchedNames.length > 0) {
      return matchedNames;
    }

    return recentPokemon.filter((pokemonName) =>
      pokemonName.toLowerCase().startsWith(normalizedInput),
    );
  }, [inputValue, pokemonNames, recentPokemon]);

  const navigateToPokemon = useCallback(
    (name: string): void => {
      const normalizedName = name.trim().toLowerCase();

      if (normalizedName) {
        saveRecentPokemonSearch(normalizedName);
        router.push(`/pokemon/${encodeURIComponent(normalizedName)}`);
      }
    },
    [router],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      navigateToPokemon(inputValue);
    },
    [inputValue, navigateToPokemon],
  );

  const handleFocus = useCallback((): void => {
    setRecentPokemon(getRecentPokemonSearches());
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback((): void => {
    window.setTimeout((): void => {
      setIsFocused(false);
    }, 120);
  }, []);

  const handleSuggestionSelect = useCallback(
    (pokemonName: string): void => {
      setInputValue(pokemonName);
      setIsFocused(false);
      navigateToPokemon(pokemonName);
    },
    [navigateToPokemon],
  );

  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-3 rounded-lg bg-white p-4 shadow-soft sm:flex-row"
      onSubmit={handleSubmit}
    >
      <div className="relative flex-1">
        <label className="sr-only" htmlFor="pokemon-search">
          Pokemon name
        </label>
        <input
          autoComplete="off"
          id="pokemon-search"
          className="min-h-12 w-full rounded-md border border-slate-300 px-4 text-base text-slate-950 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
          name="q"
          onBlur={handleBlur}
          onChange={(event): void => {
            setInputValue(event.target.value);
          }}
          onFocus={handleFocus}
          placeholder="Search Bulbasaur, Charmander, Squirtle..."
          type="search"
          value={inputValue}
        />
        {isFocused && visibleSuggestions.length > 0 ? (
          <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-72 overflow-y-auto rounded-md border border-slate-200 bg-white py-1 shadow-soft">
            {visibleSuggestions.map((pokemonName) => (
              <button
                className="block w-full px-4 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 focus:outline-none"
                key={pokemonName}
                onMouseDown={(event): void => {
                  event.preventDefault();
                }}
                onClick={(): void => {
                  handleSuggestionSelect(pokemonName);
                }}
                type="button"
              >
                {pokemonName}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <button
        className="min-h-12 rounded-md bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export const SearchInput = memo(SearchInputComponent);
