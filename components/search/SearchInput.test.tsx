import { render, screen } from '@testing-library/react';

import { SearchInput } from './SearchInput';

const pushMock = jest.fn();
const replaceMock = jest.fn();

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
    render(<SearchInput syncUrl={false} />);

    expect(screen.getByLabelText('Pokemon name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });
});
