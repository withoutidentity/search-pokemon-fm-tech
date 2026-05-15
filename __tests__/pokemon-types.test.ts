import { bulbasaurMock } from './mocks/bulbasaur.mock';
import { charmanderMock } from './mocks/charmander.mock';
import { squirtleMock } from './mocks/squirtle.mock';

describe('Pokemon Type Assertions', () => {
  it('Bulbasaur should be Grass type', () => {
    expect(bulbasaurMock.types).toContain('Grass');
  });

  it('Charmander should be Fire type', () => {
    expect(charmanderMock.types).toContain('Fire');
  });

  it('Squirtle should be Water type', () => {
    expect(squirtleMock.types).toContain('Water');
  });
});
