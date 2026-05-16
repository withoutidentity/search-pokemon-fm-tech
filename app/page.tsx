import { Suspense } from 'react';

import { SearchInput } from '@/components/search/SearchInput';
import { ProjectLogo } from '@/components/ui/ProjectLogo';

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-12">
        <div className="mb-8 max-w-3xl">
          <div className="mb-5">
            <ProjectLogo size="lg" />
          </div>
          <h1 className="text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl">
            Find Pokemon stats, attacks, and evolutions.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Search by name to view complete battle details and navigate through
            evolution chains.
          </p>
        </div>

        <Suspense fallback={<div className="h-24 rounded-lg bg-white shadow-soft" />}>
          <SearchInput />
        </Suspense>
      </section>
    </main>
  );
}
