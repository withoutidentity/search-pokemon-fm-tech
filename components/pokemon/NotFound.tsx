'use client';

import Link from 'next/link';
import { memo } from 'react';

interface NotFoundProps {
  name: string;
}

function NotFoundComponent({ name }: NotFoundProps): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <section className="w-full max-w-xl rounded-lg bg-white p-6 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Not found
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
          No Pokemon named &quot;{name}&quot;
        </h1>
        <p className="mt-3 text-slate-600">
          Check the spelling or search for a different Pokemon name.
        </p>
        <Link
          className="mt-6 inline-flex min-h-11 items-center rounded-md bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
          href="/"
        >
          Back to search
        </Link>
      </section>
    </main>
  );
}

export const NotFound = memo(NotFoundComponent);
