'use client';

import { memo, useMemo } from 'react';

import type { PokemonAttack } from '@/types/pokemon';

interface AttackListProps {
  title: string;
  attacks: PokemonAttack[];
}

function AttackListComponent({ title, attacks }: AttackListProps): JSX.Element {
  const sortedAttacks = useMemo(
    (): PokemonAttack[] =>
      [...attacks].sort((firstAttack, secondAttack): number => {
        return secondAttack.damage - firstAttack.damage;
      }),
    [attacks],
  );

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-slate-950">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {sortedAttacks.map((attack) => (
          <div
            className="rounded-lg border border-slate-200 bg-white p-4"
            key={`${attack.name}-${attack.type}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-950">{attack.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{attack.type}</p>
              </div>
              <span className="rounded-md bg-red-50 px-2.5 py-1 text-sm font-semibold text-red-700">
                {attack.damage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const AttackList = memo(AttackListComponent);
