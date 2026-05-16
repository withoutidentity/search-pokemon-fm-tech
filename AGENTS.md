# AGENTS.md

## Project Overview

`search-pokemon-fm-tech` is a Next.js 14 App Router Pokemon search app built with TypeScript, Apollo Client, GraphQL, Tailwind CSS, Jest, and React Testing Library.

The app lets users search Pokemon by name, navigate to a detail page, inspect stats and attacks, click through evolutions, and use autocomplete suggestions from the Pokemon name list.

## Current Stack

| Area | Current implementation |
| --- | --- |
| Framework | Next.js 14 App Router |
| Language | TypeScript with strict mode |
| UI | React 18 client components where interactivity is needed |
| Styling | Tailwind CSS v3 |
| Data | Apollo Client querying `https://graphql-pokemon2.vercel.app/` |
| Cache | Apollo `InMemoryCache` with `Pokemon.keyFields = ['name']` |
| Images | `next/image`, remote HTTPS images allowed by `next.config.js` |
| Tests | Jest + React Testing Library |
| Linting | `next lint` with `next/core-web-vitals` |

## Environment

Required public environment variable:

```env
NEXT_PUBLIC_GRAPHQL_URI=https://graphql-pokemon2.vercel.app/
```

This is present in `.env.example`. Local development uses `.env.local`.

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
npm run codegen
```

Notes:

- `npm test` runs `jest --runInBand` to avoid worker teardown warnings in this Windows/Node environment.
- `npm run codegen` is configured, but the project currently uses a small manual type file at `graphql/__generated__/graphql.ts`.
- `next.config.js` and `jest.config.js` are JavaScript files because this Next.js/Jest setup does not use TypeScript config files directly.

## Routing

### Home: `/`

File: `app/page.tsx`

The home page renders the main search experience:

- Large heading and description.
- `SearchInput` wrapped in `Suspense`.
- Search input reads the current `?q=` value on load.
- Search input updates `?q=` after a 300ms debounce.
- Search submit navigates to `/pokemon/[name]`.

### Detail: `/pokemon/[name]`

Files:

- `app/pokemon/[name]/page.tsx`
- `components/pokemon/PokemonDetails.tsx`

The dynamic detail page:

- Receives the Pokemon name from the route param.
- Normalizes it to lowercase.
- Runs the GraphQL Pokemon query through Apollo `useQuery`.
- Uses Apollo `cache-first` so evolution navigation can reuse cached Pokemon data.
- Shows loading, error, not found, and success states.
- Does not write to localStorage recent-search history. Evolution clicks and direct route loads should not affect recent searches.

Static params currently pre-render:

- `bulbasaur`
- `charmander`
- `squirtle`

## Search Behavior

File: `components/search/SearchInput.tsx`

`SearchInput` is a controlled client component.

Supported behavior:

- Typing updates local React state immediately.
- If `syncUrl` is true, input changes update the URL query string after 300ms.
- URL query sync uses `window.history.replaceState`, not `router.replace`.
- This avoids App Router navigation during typing, which previously caused focus/cursor loss on the home page.
- Submitting the form uses `router.push('/pokemon/[name]')`.
- Empty or whitespace-only submissions do nothing.
- The detail page passes `syncUrl={false}` so the header search does not rewrite the detail page URL while typing.

Important decision:

- Do not reintroduce `router.replace` for debounce search query updates unless the focus-loss behavior is explicitly handled.
- `router.push` remains correct for real navigation to Pokemon detail pages.

## Search Suggestions

Files:

- `components/search/SearchInput.tsx`
- `lib/pokemon/recentSearches.ts`
- `components/pokemon/PokemonDetails.tsx`

The browser's native autocomplete is disabled with `autoComplete="off"`.

The app provides its own suggestion dropdown:

- When the input has text, suggestions come from the full Pokemon name list loaded with `GET_POKEMON_NAMES`.
- Name suggestions use prefix matching, so typing `b` shows Pokemon whose names start with `b`.
- The name list is fetched with Apollo `cache-first`, so it is stored in Apollo `InMemoryCache` for the current browser tab.
- When the input is empty, suggestions come from searches submitted through `SearchInput`.
- Recent-search data is stored in localStorage under `recentPokemonSearches`.
- The legacy `lastPokemon` key is still written by the recent-search helper for compatibility, but the input no longer auto-restores it.
- Clearing the input should keep it clear; it must not repopulate from `lastPokemon`.
- Suggestions are filtered by the current input text.
- Clicking a suggestion navigates to that Pokemon detail page.

Current recent-search helper behavior:

- Keeps up to 5 names.
- Deduplicates case-insensitively.
- Ignores empty names.
- Safely handles malformed localStorage JSON.

## Data Layer

### Apollo Client

File: `lib/apollo/client.ts`

Apollo is configured with:

- `HttpLink` using `NEXT_PUBLIC_GRAPHQL_URI`.
- `InMemoryCache`.
- Type policy: `Pokemon.keyFields = ['name']`.

Use `HttpLink`; do not use the older direct `uri` option on `ApolloClient`.

### Apollo Provider

File: `lib/apollo/provider.tsx`

`ApolloWrapper` is a client component that wraps the app in `ApolloProvider`.

It is used from `app/layout.tsx`.

### GraphQL Query

File: `graphql/queries/getPokemon.ts`

The `GET_POKEMON` query fetches:

- id
- name
- number
- image
- types
- maxHP
- maxCP
- weight
- height
- fast attacks
- special attacks
- evolutions

Variables are passed through GraphQL variables. Do not string-interpolate user input into query documents.

## Components

### `PokemonDetails`

Coordinates detail-page data loading and state:

- loading: centered spinner
- error: request failed panel
- not found: `NotFound`
- success: header search + `PokemonCard`
- does not save recent-search storage

### `PokemonCard`

Renders the main Pokemon detail view:

- image
- number
- name
- type badges
- max HP
- max CP
- height range
- weight range
- fast attacks
- special attacks
- evolutions

Uses `next/image` and is wrapped in `React.memo`.

### `AttackList`

Renders attacks sorted by descending damage.

Uses `useMemo` for sorting and `React.memo` for component memoization.

### `EvolutionList`

Renders clickable evolution cards.

Each evolution links to:

```txt
/pokemon/[lowercase-evolution-name]
```

If there are no evolutions, it shows a clear empty state.

### `NotFound`

Shows when the API returns `pokemon: null`.

Includes a link back to `/`.

### UI Components

- `Badge`: type badge.
- `Spinner`: loading indicator.
- `ErrorBoundary`: reusable client error boundary. Currently available but not wired around route content.

## Hooks

### `useSearchParam`

File: `lib/hooks/useSearchParam.ts`

Reads a query value from `useSearchParams`.

Writes query changes with `window.history.replaceState` to avoid App Router navigation during typing.

Returns:

- `value`
- `setValue`
- `clearValue`

### `usePokemonSearch`

File: `lib/hooks/usePokemonSearch.ts`

Wraps Apollo `useLazyQuery` with `fetchPolicy: 'network-only'`.

This hook exists for search-style query execution, but the current UI navigates to detail pages instead of rendering lazy-query search results directly.

## Types

File: `types/pokemon.ts`

Shared interfaces:

- `PokemonDimension`
- `PokemonAttack`
- `PokemonAttacks`
- `PokemonEvolution`
- `Pokemon`

File: `graphql/__generated__/graphql.ts`

Manual lightweight GraphQL result/variable types:

- `GetPokemonQueryVariables`
- `GetPokemonQuery`

If GraphQL Code Generator is run and replaces generated output, keep imports and query typings aligned.

## Tests

Current tests:

- `__tests__/pokemon-types.test.ts`
- `components/search/SearchInput.test.tsx`

Mocks:

- `__tests__/mocks/bulbasaur.mock.ts`
- `__tests__/mocks/charmander.mock.ts`
- `__tests__/mocks/squirtle.mock.ts`

Current assertions:

- Bulbasaur contains `Grass`.
- Charmander contains `Fire`.
- Squirtle contains `Water`.
- Search input renders a labeled input and Search button.

Jest ignores `.next` and `node_modules`.

## Styling Notes

The visual style is a restrained utility UI:

- light slate background
- white tool/detail panels
- red primary action color
- rounded cards at `rounded-lg`
- responsive layouts with `sm:` and `lg:` breakpoints

Keep future UI changes consistent with this style. Avoid unrelated decorative backgrounds or large visual rewrites unless requested.

## Current User-Facing Capabilities

Users can:

- Open the home page.
- Type a Pokemon name.
- See the URL query update as `?q=...` without losing input focus.
- Submit the search.
- Navigate to `/pokemon/[name]`.
- View Pokemon image, number, name, types, HP, CP, height, weight, attacks, and evolutions.
- Click evolution cards to navigate to another Pokemon detail page.
- Use the header search from a detail page.
- See loading state while Pokemon details are being fetched.
- See an error state if the request fails.
- See a not-found state if the Pokemon does not exist.
- Reuse recent SearchInput submissions through the custom suggestion dropdown.
- Clear the search input without it being repopulated by the previous Pokemon name.

## Current Project Capabilities

Developers can:

- Run the app locally with `npm run dev`.
- Build production output with `npm run build`.
- Run tests with `npm test`.
- Run linting with `npm run lint`.
- Configure the GraphQL endpoint through `NEXT_PUBLIC_GRAPHQL_URI`.
- Add more GraphQL fields by updating `GET_POKEMON`, shared types, and UI components together.
- Add more tests using Jest and React Testing Library.
- Deploy to Vercel as a standard Next.js app.

## Known Constraints

- This project depends on the public Pokemon GraphQL API being reachable.
- The app does not currently use server-side Apollo prefetching.
- `generateStaticParams` only lists three starter Pokemon.
- Recent-search suggestions are local to the user's browser.
- There is no full autocomplete API search; suggestions only come from SearchInput submissions stored in the browser.
- `usePokemonSearch` is present but not currently used by the rendered pages.
- `ErrorBoundary` is present but not currently mounted around page content.

## Change Guidelines

When editing this project:

- Keep TypeScript strict and avoid `any`.
- Keep GraphQL variables typed and never interpolate user input into GraphQL strings.
- Keep search typing stable; avoid App Router navigation on every keystroke.
- Preserve the expected behavior that clearing the input leaves it empty.
- Use `next/image` for Pokemon images.
- Prefer small, focused components matching the existing folder structure.
- Run `npm test`, `npm run lint`, and `npm run build` before considering the change done.
