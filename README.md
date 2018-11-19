# Get Started

- [Installation](https://github.com/vukhanhtruong/nodejs-es6-api#installation)
- [Running Docker](https://github.com/vukhanhtruong/nodejs-es6-api#running-docker)
- [Coveralls](https://github.com/vukhanhtruong/nodejs-es6-api#coveralls)
- [Raven Log](https://github.com/vukhanhtruong/nodejs-es6-api#raven-log)
- [Api Doc](https://github.com/vukhanhtruong/nodejs-es6-api#api-doc)
- [Body Whitelist](https://github.com/vukhanhtruong/nodejs-es6-api#body-whitelist)
- [Pre-Commit Hook](https://github.com/vukhanhtruong/nodejs-es6-api#pre-commit-hook)
- [Scripts](https://github.com/vukhanhtruong/nodejs-es6-api#scripts)
- [Validation Middleware](https://github.com/vukhanhtruong/nodejs-es6-api#validation-middleware)
- [Seeds](https://github.com/vukhanhtruong/nodejs-es6-api#seeds)
- [References](https://github.com/vukhanhtruong/nodejs-es6-api#references)

## Prerequisite
1. NodeJS
2. Node Package Management (`yarn` or `npm`)
3. Docker

## Installation

1. Clone the project `git clone git@github.com:vukhanhtruong/nodejs-es6-api.git`.
2. Install dependencies `yarn install` or `npm i`
3. Copy `.env.example` to `.env` file.

---

## Running Docker

`docker-compose up -d`.

---

## Coveralls

Create account at [Coveralls](https://coveralls.io), then put your token to `.coveralls.yml`. Then run the following command to publish your coverage report to coveralls.io.

```sh
yarn cover:report

# or

npm run cover:report
```

---

## Raven Log

Create account at [Sentry](https://sentry.io/), then put your url to `.env` file.

---

## Api Doc

Api doc his hosted on [surge](https://surge.sh/). For change the url and have your own docs just modify your link in the `.env` file. Running the following command to publish your documentation.

```sh
# Generate document
yarn doc
# Deploy document to surge.sh
yarn doc:deploy

# or
npm run doc
npm run doc:deploy
```
---

## Body Whitelist

For security have add a whitelist function for your `req.body` coming from the front end. Take a look of it in the `whitelist.js` file.

```js
const WHITELIST = {
  // for users route
  users: {
    create: ['email', 'username', 'password'],
  },
  ...
};
```

---


## Pre-Commit Hook

Using `husky` for linting your code before commit & running unit test before push.

---

## Scripts

### DEV

```sh
yarn dev

# or

npm run dev
```

### DEBUG

Debug with VSCode. See [VSCode Auto-Attach](https://code.visualstudio.com/updates/v1_22#_node-debugging)

```sh
yarn debug

# or

npm run debug
```

### TEST

```sh
yarn test

# or

npm run test
```

#### Test Watch

```sh
# Default is __tests__
yarn test:set_path PATH_TO_YOUR_TEST_DIR

yarn test:watch
```

### COVERAGE

```sh
yarn cover

yarn cover:check

# Publish cover to coveralls
yarn cover:report

# or

npm run cover

npm run cover:check

npm run cover:report
```

### JSDOC

```sh
# generate documentation
yarn doc

# Publish documentation to surge.sh
yarn doc:deploy

#or

npm run doc

npm run doc:deploy
```

---

## Seeds

To create fake users, just running the following command.

*To find out more, please take a look to this folder `/scripts/seeds`*

- Seeds 10 users `yarn seeds:user:create`
- Clear users collection `yarn seeds:user:clear`
- Clear all collection `yarn seeds:user:clear-all`

---

## References

- [Backpack](https://github.com/jaredpalmer/backpack/)
- [Express Brute](https://www.npmjs.com/package/express-brute)
- [Helmet](https://github.com/helmetjs/helmet)
- [Cors](https://github.com/expressjs/cors)
- [Body-Parser](https://github.com/expressjs/body-parser)
- [Morgan](https://github.com/expressjs/morgan)
- [PassportJS](https://github.com/jaredhanson/passport)
- [Passport-Local](https://github.com/jaredhanson/passport-local)
- [Passport-JWT](https://github.com/themikenicholson/passport-jwt)
- [Raven](https://github.com/getsentry/raven-node)
- [Joi](https://github.com/hapijs/joi)
- [Http-Status](https://github.com/adaltas/node-http-status)
- [Lint-Staged](https://github.com/okonet/lint-staged)
- [Husky](https://github.com/typicode/husky)
- [Prettier](https://github.com/prettier/prettier)
- [Eslint Config Prettier](https://github.com/prettier/eslint-config-prettier)
- [CodeClimate](https://codeclimate.com/)
- [Coveralls](https://github.com/integrations/coveralls)
- [Travis Ci](https://travis-ci.org/)
- [Istanbul CLI](https://github.com/istanbuljs/nyc)
- [Mocha](https://github.com/mochajs/mocha)
- [Chai](https://github.com/chaijs/chai)
- [Supertest](https://github.com/visionmedia/supertest)
- [NPS](https://github.com/kentcdodds/nps)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/)

---
