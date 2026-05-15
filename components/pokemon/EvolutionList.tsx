'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import type { PokemonEvolution } from '@/types/pokemon';

interface EvolutionListProps {
  evolutions: PokemonEvolution[] | null;
}

function EvolutionListComponent({ evolutions }: EvolutionListProps): JSX.Element {
  if (!evolutions?.length) {
    return (
      <section>
        <h2 className="mb-3 text-lg font-semibold text-slate-950">Evolutions</h2>
        <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
          No further evolutions found.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-slate-950">Evolutions</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {evolutions.map((evolution) => (
          <Link
            className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-red-300 hover:shadow-soft"
            href={`/pokemon/${encodeURIComponent(evolution.name.toLowerCase())}`}
            key={evolution.id}
          >
            <div className="relative h-16 w-16 shrink-0">
              <Image
                alt={evolution.name}
                className="object-contain"
                fill
                sizes="64px"
                src={evolution.image}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">
                #{evolution.number}
              </p>
              <h3 className="font-semibold text-slate-950 group-hover:text-red-700">
                {evolution.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {evolution.types.join(' / ')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export const EvolutionList = memo(EvolutionListComponent);
