import type { Pokemon } from '@/types/pokemon';

export interface GetPokemonQueryVariables {
  name: string;
}

export interface GetPokemonQuery {
  pokemon: Pokemon | null;
}
