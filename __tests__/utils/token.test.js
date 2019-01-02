import token from '../../src/utils/token';

describe('Test Random String()', () => {
  test('It should return users create body', () => {
    expect(typeof token(123)).toBe('string');
  });
});
