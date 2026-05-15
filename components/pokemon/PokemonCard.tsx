'use client';

import Image from 'next/image';
import { memo } from 'react';

import { Badge } from '@/components/ui/Badge';
import type { Pokemon } from '@/types/pokemon';

import { AttackList } from './AttackList';
import { EvolutionList } from './EvolutionList';

interface PokemonCardProps {
  pokemon: Pokemon;
}

function PokemonCardComponent({ pokemon }: PokemonCardProps): JSX.Element {
  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-8 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-lg bg-white p-5 shadow-soft">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <Image
              alt={pokemon.name}
              className="object-contain"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              src={pokemon.image}
            />
          </div>
        </section>

        <section className="rounded-lg bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-slate-500">#{pokemon.number}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
            {pokemon.name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <Badge key={type} label={type} />
            ))}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Max HP
              </dt>
              <dd className="mt-1 text-xl font-bold text-slate-950">
                {pokemon.maxHP}
              </dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Max CP
              </dt>
              <dd className="mt-1 text-xl font-bold text-slate-950">
                {pokemon.maxCP}
              </dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Height
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {pokemon.height.minimum} - {pokemon.height.maximum}
              </dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Weight
              </dt>
              <dd className="mt-1 text-sm font-semibold text-slate-950">
                {pokemon.weight.minimum} - {pokemon.weight.maximum}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AttackList attacks={pokemon.attacks.fast} title="Fast attacks" />
        <AttackList attacks={pokemon.attacks.special} title="Special attacks" />
      </div>

      <div className="mt-6">
        <EvolutionList evolutions={pokemon.evolutions} />
      </div>
    </article>
  );
}

export const PokemonCard = memo(PokemonCardComponent);
