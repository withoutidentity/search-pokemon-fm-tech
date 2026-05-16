import Image from 'next/image';
import { memo } from 'react';

interface ProjectLogoProps {
  size?: 'sm' | 'lg';
}

function ProjectLogoComponent({ size = 'sm' }: ProjectLogoProps): JSX.Element {
  const imageSize = size === 'lg' ? 56 : 36;
  const labelClassName =
    size === 'lg'
      ? 'text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl'
      : 'text-lg font-bold text-slate-950';

  return (
    <span className="inline-flex items-center gap-3">
      <span className="flex shrink-0 items-center justify-center rounded-full bg-white shadow-soft ring-1 ring-slate-200">
        <Image
          alt=""
          height={imageSize}
          priority={size === 'lg'}
          src="/poke-ball-icon.svg"
          width={imageSize}
        />
      </span>
      <span className={labelClassName}>Pokemon Search</span>
    </span>
  );
}

export const ProjectLogo = memo(ProjectLogoComponent);
