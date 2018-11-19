// for posts route
const POSTS = {
  posts: {
    create: ['title', 'text'],
    update: ['title', 'text'],
  },
};

// for users route
const USERS = {
  users: {
    create: ['email', 'username', 'password'],
  },
};

export const WHITELIST = { ...POSTS, ...USERS };
