import server from '@/__mocks__/utils/server.mock';

const ENDPOINT = '/api/wrong/path';

/**
 * @test {not-found.test.js}
 */
describe(`ALL ${ENDPOINT}`, () => {
  test('should return `You are not authorized to access this resource` message when POST', done => {
    server.post(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).toBe(403);
      expect(body.message).toBe(
        'You are not authorized to access this resource',
      );
      done();
    });
  });

  test('should return `You are not authorized to access this resource` message when GET', done => {
    server.get(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).toBe(403);
      expect(body.message).toBe(
        'You are not authorized to access this resource',
      );
      done();
    });
  });

  test('should return `You are not authorized to access this resource` message when PUT', done => {
    server.put(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).toBe(403);
      expect(body.message).toBe(
        'You are not authorized to access this resource',
      );
      done();
    });
  });

  test('should return `You are not authorized to access this resource` message when DELETE', done => {
    server.delete(ENDPOINT).end((err, res) => {
      const { body, status } = res;
      expect(status).toBe(403);
      expect(body.message).toBe(
        'You are not authorized to access this resource',
      );
      done();
    });
  });
});
