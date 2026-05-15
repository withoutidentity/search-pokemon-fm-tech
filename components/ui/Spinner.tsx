interface SpinnerProps {
  label: string;
}

export function Spinner({ label }: SpinnerProps): JSX.Element {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-red-600" />
      <span>{label}</span>
    </div>
  );
}
