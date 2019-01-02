## Prerequisite
1. NodeJS
2. Node Package Management (`yarn` or `npm`)
3. Docker

## Installation

1. Clone the project `git clone git@github.com:vukhanhtruong/nodejs-api-boilerplate.git`.
2. Install dependencies `yarn install` or `npm i`
3. Copy `.env.example` to `.env` file.

---

## Running Docker

`docker-compose up -d`.

---

## Raven Log

Create account at [Sentry](https://sentry.io/), then put your url to `.env` file at variable `SENTRY_DSN`.

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

**NOTE:** If you have the issue with ENOSPC, run the below command to avoid:

```sh
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

#### Test Watch

```sh
yarn test:watch
```

### COVERAGE

```sh
# run jest coverage
yarn test:cover

# show html report
yarn test:cover:open

# or

npm run test:cover

npm run test:cover:open
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

## Deployment

### Heroku Configuration

Generate heroku token. Then add this token to Gitlab CI Variables as HEROKU_TOKEN

```sh
heroku auth:token
```

### Gitlab CI & CD
Code will automatically test & deploy to [Heroku](https://devcenter.heroku.com/articles/container-registry-and-runtime#logging-in-to-the-registry) after merging into `development` branch.

To test gitlabCI on locally, run the following command

```sh
# to run test service
gitlab-runner exec docker test

# to run deployment service
gitlab-runner exec docker development --docker-privileged
```

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
- [Jest](https://github.com/mochajs/mocha)
- [Chai](https://github.com/chaijs/chai)
- [Supertest](https://github.com/visionmedia/supertest)
- [NPS](https://github.com/kentcdodds/nps)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/)

---
