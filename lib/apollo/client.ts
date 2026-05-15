import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const graphqlUri =
  process.env.NEXT_PUBLIC_GRAPHQL_URI ?? 'https://graphql-pokemon2.vercel.app/';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUri,
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Pokemon: {
        keyFields: ['name'],
      },
    },
  }),
});
