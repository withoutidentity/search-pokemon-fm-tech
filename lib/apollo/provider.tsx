'use client';

import { ApolloProvider } from '@apollo/client';
import type { ReactNode } from 'react';

import { client } from './client';

interface ApolloWrapperProps {
  children: ReactNode;
}

export function ApolloWrapper({ children }: ApolloWrapperProps): JSX.Element {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
