import { filteredBody } from '../../src/utils/filteredBody';
import { WHITELIST } from '../../src/config/whitelist';

describe('#filteredBody()', () => {
  test('It should return users create body', () => {
    const body = {
      name: 'Hello World',
      email: 'test@gmail.com',
      phone: 123,
    };
    expect(filteredBody(body, WHITELIST.users.create).name).toBe('Hello World');
    expect(filteredBody(body, WHITELIST.users.create).email).toBe(
      'test@gmail.com',
    );
    expect(filteredBody(body, WHITELIST.users.create).phone).toBe(123);
    expect(filteredBody(body, WHITELIST.users.create).token).toBeUndefined();
  });
});
