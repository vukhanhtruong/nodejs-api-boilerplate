/**
 * Limit the allowed login requests of each user
 * https://github.com/AdamPflug/express-brute
 */

import HTTPStatus from 'http-status';
import ExpressBrute from 'express-brute';
import MongooseStore from 'express-brute-mongoose';
import mongoose from 'mongoose';

const BruteForceSchema = mongoose.Schema({
  _id: String,
  data: {
    count: Number,
    lastRequest: Date,
    firstRequest: Date,
  },
  expires: Date,
});

export const BruteForceModel = mongoose.model('bruteforce', BruteForceSchema);
const store = new MongooseStore(BruteForceModel);
const env = process.env.NODE_ENV;

const failCallback = function(req, res, next, nextValidRequestDate) {
  res.status(HTTPStatus.BAD_REQUEST).json({
    message: "You've made too many failed attempts in a short period of time.",
  });
};

const handleStoreError = function(error) {
  throw {
    message: error.message,
    parent: error.parent,
  };
};

let limit = env === 'production' ? 5 : 20;
export const bruteforce = new ExpressBrute(store, {
  freeRetries: env === 'production' ? 5 : 20,
  minWait: 5 * 60 * 1000, // 5 minutes
  maxWait: 60 * 60 * 1000, // 1 hour,
  failCallback: failCallback,
  handleStoreError: handleStoreError,
});

export default bruteforce.prevent;
