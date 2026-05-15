const RECENT_POKEMON_KEY = 'recentPokemonSearches';
const MAX_RECENT_POKEMON = 5;

function normalizePokemonName(name: string): string {
  return name.trim();
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

export function getRecentPokemonSearches(): string[] {
  const storedValue = window.localStorage.getItem(RECENT_POKEMON_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!isStringArray(parsedValue)) {
      return [];
    }

    return parsedValue.map(normalizePokemonName).filter(Boolean);
  } catch {
    return [];
  }
}

export function saveRecentPokemonSearch(name: string): void {
  const normalizedName = normalizePokemonName(name);

  if (!normalizedName) {
    return;
  }

  const previousSearches = getRecentPokemonSearches();
  const nextSearches = [
    normalizedName,
    ...previousSearches.filter(
      (pokemonName) =>
        pokemonName.toLowerCase() !== normalizedName.toLowerCase(),
    ),
  ].slice(0, MAX_RECENT_POKEMON);

  window.localStorage.setItem(RECENT_POKEMON_KEY, JSON.stringify(nextSearches));
  window.localStorage.setItem('lastPokemon', normalizedName);
}
