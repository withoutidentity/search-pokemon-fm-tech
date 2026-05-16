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
- Custom recent-search suggestions from searches submitted through the search input
- Loading, error, and not-found states
- Apollo cache configured by Pokemon name for smoother navigation
- Responsive UI with Tailwind CSS

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

