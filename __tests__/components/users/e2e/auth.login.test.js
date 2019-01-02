import server from '@/__mocks__/utils/server.mock';
import { BruteForceModel } from '@/utils/brute';
import User from '@/components/users/user.model';
import UserFactory from '@/__mocks__/factories/user.factory';

const ENDPOINT = '/api/users/login';

let testUser;

/**
 * @test {auth.routes.js}
 */
describe(`POST ${ENDPOINT}`, () => {
  beforeEach(async done => {
    await BruteForceModel.remove();
    await User.remove();
    testUser = await User.create(UserFactory.generate());
    done();
  });

  describe('login with a status 200', () => {
    test('should return a token with the user _id', done => {
      server
        .post(ENDPOINT)
        .send({ email: testUser.email, password: 'password1' })
        .end((err, res) => {
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body._id).toBe(testUser._id.toString());
          expect(body).toHaveProperty('token');
          done();
        });
    });
  });

  describe('not login with status 401', () => {
    test('should not allowed user to log with wrong password', done => {
      server
        .post(ENDPOINT)
        .send({ email: testUser.email, password: 'passwwejnwg3' })
        .end((err, res) => {
          const { text, status } = res;
          expect(status).toBe(401);
          expect(text).toBe('Unauthorized');
          done();
        });
    });
  });
});

describe(`SECURITY ${ENDPOINT}`, () => {
  beforeEach(async done => {
    const brute = await BruteForceModel.findOne();
    await BruteForceModel.findOneAndUpdate(
      { _id: brute._id },
      { $set: { 'data.count': 25 } },
    );

    await User.remove();
    testUser = await User.create(UserFactory.generate());

    return done();
  });

  describe('Login over the limitation with status 400', () => {
    test('should not allowed user to login', done => {
      const data = { email: testUser.email, password: 'password1' };

      server
        .post(ENDPOINT)
        .send(data)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body.message).toBe(
            "You've made too many failed attempts in a short period of time.",
          );
          done();
        });
    });
  });
});
