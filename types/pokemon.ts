export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface PokemonAttack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonAttacks {
  fast: PokemonAttack[];
  special: PokemonAttack[];
}

export interface PokemonEvolution {
  id: string;
  name: string;
  number: string;
  image: string;
  types: string[];
}

export interface Pokemon {
  id: string;
  name: string;
  number: string;
  image: string;
  types: string[];
  maxHP: number;
  maxCP: number;
  weight: PokemonDimension;
  height: PokemonDimension;
  attacks: PokemonAttacks;
  evolutions: PokemonEvolution[] | null;
}
