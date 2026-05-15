import { memo } from 'react';

interface BadgeProps {
  label: string;
}

function BadgeComponent({ label }: BadgeProps): JSX.Element {
  return (
    <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
      {label}
    </span>
  );
}

export const Badge = memo(BadgeComponent);
