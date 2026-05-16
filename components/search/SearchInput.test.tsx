import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';

import { GET_POKEMON_NAMES } from '@/graphql/queries/getPokemon';

import { SearchInput } from './SearchInput';

const pushMock = jest.fn();
const replaceMock = jest.fn();

const pokemonNamesMock = {
  request: {
    query: GET_POKEMON_NAMES,
    variables: {
      first: 151,
    },
  },
  result: {
    data: {
      pokemons: [],
    },
  },
};

jest.mock('next/navigation', () => ({
  usePathname: (): string => '/',
  useRouter: (): { push: jest.Mock; replace: jest.Mock } => ({
    push: pushMock,
    replace: replaceMock,
  }),
  useSearchParams: (): URLSearchParams => new URLSearchParams(),
}));

describe('SearchInput', () => {
  beforeEach(() => {
    pushMock.mockClear();
    replaceMock.mockClear();
    window.localStorage.clear();
  });

  it('renders a Pokemon search field', () => {
    render(
      <MockedProvider mocks={[pokemonNamesMock]}>
        <SearchInput syncUrl={false} />
      </MockedProvider>,
    );

    expect(screen.getByLabelText('Pokemon name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});
