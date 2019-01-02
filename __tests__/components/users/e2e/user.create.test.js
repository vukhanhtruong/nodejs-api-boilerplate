import server from '@/__mocks__/utils/server.mock';
import User from '@/components/users/user.model';
import { BruteForceModel } from '@/utils/brute';
import UserFactory from '@/__mocks__/factories/user.factory';

const ENDPOINT = '/api/users/signup';
let generatedUser;
describe(`POST ${ENDPOINT}`, () => {
  beforeEach(async () => {
    await BruteForceModel.remove();
    await User.remove();
  });

  describe('Create with status 201', () => {
    test('should return the _id of the user and a token', done => {
      server
        .post(ENDPOINT)
        .send(UserFactory.generate())
        .end((err, res) => {
          const { status, body } = res;
          expect(status).toBe(201);
          expect(body).toHaveProperty('_id');
          expect(body).toHaveProperty('token');
          done();
        });
    });
  });

  describe('Error with status 400', () => {
    beforeEach(async () => {
      await BruteForceModel.remove();
      await User.remove();
      generatedUser = await User.create(UserFactory.generate());
    });

    test('should return an error if email are already taken', async done => {
      server
        .post(ENDPOINT)
        .send(
          UserFactory.generate({
            email: generatedUser.email,
          }),
        )
        .end((err, res) => {
          const { status, body } = res;
          expect(status).toBe(400);
          expect(body).toHaveProperty('message');
          expect(body.errors.email).toEqual(
            `Path \`email\` (${generatedUser.email}) is not unique.`,
          );
          done();
        });
    });

    test('should return an error if email is not provided', done => {
      server
        .post(ENDPOINT)
        .send({ password: 'password1' })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).toBe(400);
          expect(body.message).toBe('validation error');
          expect(body.errors.email).toBe('email is required');
          done();
        });
    });

    test('should return an error if password is not provided', done => {
      server
        .post(ENDPOINT)
        .send({ email: 'user@gmail.com' })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).toBe(400);
          expect(body.message).toBe('validation error');
          expect(body.errors.password).toBe('password is required');
          done();
        });
    });

    test('should return an error if email is not a valid email', done => {
      server
        .post(ENDPOINT)
        .send({
          email: 'user@gmai',
          password: 'password1',
          company: 'test',
          phone: 123,
          name: 'test',
        })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).toBe(400);
          expect(body.message).toBe(
            'User validation failed: email: user@gmai is not a valid email!',
          );
          expect(body.errors.email).toBe('user@gmai is not a valid email!');
          done();
        });
    });

    test('should return an error if password is not a good enough', done => {
      server
        .post(ENDPOINT)
        .send({
          email: 'user@gmail.com',
          password: 'pass',
        })
        .end((err, res) => {
          const { status, body } = res;
          expect(status).toBe(400);
          expect(body.message).toBe('validation error');
          expect(body.errors.password).toBe(
            'password length must be at least 6 characters long',
          );
          done();
        });
    });
  });
});
