import { PokemonDetails } from '@/components/pokemon/PokemonDetails';

interface PokemonPageProps {
  params: {
    name: string;
  };
}

export function generateStaticParams(): Array<PokemonPageProps['params']> {
  return [
    { name: 'bulbasaur' },
    { name: 'charmander' },
    { name: 'squirtle' },
  ];
}

export default function PokemonPage({ params }: PokemonPageProps): JSX.Element {
  return <PokemonDetails name={decodeURIComponent(params.name)} />;
}
