/**
 * Create fake user for testing
 */

import faker from 'faker';

import BaseFactory from './base.factory';

class UserFactory extends BaseFactory {
  /**
   * Create a user
   *
   * @public
   * @param {Object} attrs of user
   * @returns {Object} a fake user
   */
  generate(attrs) {
    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: 'password1',
      company: `${faker.company.companyName()}`,
      phone: `${faker.random.number()}`,
      ...attrs,
    };
  }
}

export default new UserFactory();
