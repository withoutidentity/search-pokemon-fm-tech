# Search Pokemon FM Tech

A Pokemon search application built with Next.js, TypeScript, Apollo Client, GraphQL, and Tailwind CSS. Users can search for a Pokemon by name, view detailed stats, attacks, and evolutions, and navigate between evolution pages.

## Tech Stack

- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **UI:** React
- **Styling:** Tailwind CSS
- **Data Fetching:** Apollo Client
- **API:** GraphQL Pokemon API
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel

## Features

- Search Pokemon by name
- Sync home search input with the `?q=` URL query
- View Pokemon image, number, types, HP, CP, height, and weight
- View fast and special attacks sorted by damage
- Navigate between Pokemon evolutions
- Autocomplete suggestions from the full Pokemon name list
- Recent-search suggestions when the search input is empty
- Loading, error, and not-found states
- Apollo cache configured by Pokemon name for smoother navigation
- Responsive UI with Tailwind CSS

## Project Structure

```txt
search-pokemon-fm-tech/
├── app/                    # Next.js App Router pages, layout, global styles, app icon
│   ├── page.tsx            # Home search page
│   └── pokemon/[name]/     # Pokemon detail route
├── components/             # Reusable React components
│   ├── pokemon/            # Detail, card, attacks, evolutions, not-found UI
│   ├── search/             # Search input and tests
│   └── ui/                 # Shared UI pieces
├── graphql/                # GraphQL queries and typed query shapes
├── lib/                    # Apollo setup, hooks, and local utilities
├── types/                  # Shared TypeScript interfaces
├── __tests__/              # Jest tests and Pokemon mocks
└── public/                 # Static assets
```

## Installation & Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
cp .env.example .env.local
```

3. Confirm the GraphQL endpoint is set:

```env
NEXT_PUBLIC_GRAPHQL_URI=https://graphql-pokemon2.vercel.app/
```

4. Run the development server:

```bash
npm run dev
```

5. Open the app:

```txt
http://localhost:3000
```

Useful commands:

```bash
npm test
npm run lint
npm run build
```
