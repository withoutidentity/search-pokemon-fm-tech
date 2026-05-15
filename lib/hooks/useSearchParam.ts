'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface SearchParamState {
  value: string;
  setValue: (value: string) => void;
  clearValue: () => void;
}

export function useSearchParam(key: string): SearchParamState {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get(key) ?? '';

  const setValue = useCallback(
    (nextValue: string): void => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextValue.trim()) {
        params.set(key, nextValue);
      } else {
        params.delete(key);
      }

      const nextSearch = params.toString();
      const nextUrl = nextSearch ? `${pathname}?${nextSearch}` : pathname;

      if (nextUrl !== window.location.pathname + window.location.search) {
        window.history.replaceState(null, '', nextUrl);
      }
    },
    [key, pathname, searchParams],
  );

  const clearValue = useCallback((): void => {
    setValue('');
  }, [setValue]);

  return useMemo(
    () => ({
      value,
      setValue,
      clearValue,
    }),
    [clearValue, setValue, value],
  );
}
