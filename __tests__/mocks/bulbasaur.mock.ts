import type { Pokemon } from '@/types/pokemon';

export const bulbasaurMock: Pokemon = {
  id: 'UG9rZW1vbjowMDE=',
  name: 'Bulbasaur',
  number: '001',
  image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
  types: ['Grass', 'Poison'],
  maxHP: 1071,
  maxCP: 951,
  weight: {
    minimum: '6.04kg',
    maximum: '7.76kg',
  },
  height: {
    minimum: '0.61m',
    maximum: '0.79m',
  },
  attacks: {
    fast: [],
    special: [],
  },
  evolutions: null,
};
