/**
 * Limit the allowed login requests of each user
 */

import HTTPStatus from 'http-status';
import constant from '@/config/constants';
import ExpressBrute, { MemoryStore } from 'express-brute';
import RedisStore from 'express-brute-redis';

let store;
const env = process.env.NODE_ENV;

if (env === 'production') {
  store = new RedisStore({
    host: constant.REDIS_HOST,
    port: constant.REDIS_PORT,
    password: constant.REDIS_PASSWORD,
  });
} else {
  store = new MemoryStore();
}

const failCallback = function(req, res, next, nextValidRequestDate) {
  res.status(HTTPStatus.BAD_REQUEST).json({
    message: "You've made too many failed attempts in a short period of time",
  });
};

const handleStoreError = function(error) {
  throw {
    message: error.message,
    parent: error.parent,
  };
};

const bruteforce = new ExpressBrute(store, {
  freeRetries: env === 'production' ? 5 : 20,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});

export default bruteforce.prevent;
