import type { Pokemon } from '@/types/pokemon';

export interface GetPokemonQueryVariables {
  name: string;
}

export interface GetPokemonQuery {
  pokemon: Pokemon | null;
}

export interface PokemonNameResult {
  id: string;
  name: string;
}

export interface GetPokemonNamesQueryVariables {
  first: number;
}

export interface GetPokemonNamesQuery {
  pokemons: PokemonNameResult[];
}
