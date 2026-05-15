import { Spinner } from '@/components/ui/Spinner';

export default function PokemonLoading(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <Spinner label="Loading Pokemon" />
    </main>
  );
}
