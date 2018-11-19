import faker from 'faker';

import User from '../user.model';

export async function userSeed(count) {
  const users = [];

  Array.from({ length: count || 10 }).map(() => {
    const fakeUser = {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      username: faker.internet.userName().toLowerCase(),
      email: faker.internet.email().toLowerCase(),
      password: 'password1',
    };
    return users.push(fakeUser);
  });

  return await User.insertMany(users);
}

export async function deleteUserSeed() {
  try {
    return await User.remove();
  } catch (e) {
    return e;
  }
}
