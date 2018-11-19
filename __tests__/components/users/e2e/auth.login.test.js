import { expect } from 'chai';

import server from '@/__mocks__/utils/server.mock';
import User from '@/components/users/user.model';
import UserFactory from '@/__mocks__/factories/user.factory';

const ENDPOINT = '/api/users/login';

let testUser;
const stressLoginTesting = function(server, data, callback) {
  for (let i = 0; i < 18; i++) {
    server
      .post(ENDPOINT)
      .send(data)
      .end((err, res) => {
        if (i === 18) callback(err, res);
      });
  }
};

/**
 * @test {auth.routes.js}
 */
describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });

  describe('login with a status 200', () => {
    it('should return a token with the user _id', done => {
      server
        .post(ENDPOINT)
        .send({ email: testUser.email, password: 'password1' })
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          expect(body._id).to.equal(testUser._id.toString());
          expect(body).to.haveOwnProperty('token');
          done();
        });
    });
  });

  describe('not login with status 401', () => {
    it('should not allowed user to log with wrong password', done => {
      server
        .post(ENDPOINT)
        .send({ email: testUser.email, password: 'passwwejnwg3' })
        .end((err, res) => {
          const { text, status } = res;
          expect(status).to.equal(401);
          expect(text).to.equal('Unauthorized');
          done();
        });
    });
  });

  // describe('Login multi times with status 400', () => {
  //   it('should not allowed user to log with multi time', done => {
  //     const data = { email: testUser.email, password: 'password1' };
  //     stressLoginTesting(server, data, function(err, res) {
  //       const { body, status } = res;
  //       expect(status).to.equal(400);
  //       expect(body.message).to.equal(
  //         "You've made too many failed attempts in a short period of time",
  //       );
  //       done();
  //     });
  //   });
  // });
});
