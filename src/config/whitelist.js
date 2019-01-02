/**
 *  CORS WHITELIST
 *
 */
require('dotenv').config({});

const env = process.env.NODE_ENV;

const devWhitelistURLs = env === 'development' ? ['http://localhost:9000'] : [];

const WHITELIST_URL = [...devWhitelistURLs, process.env.WHITELIST_URL];

export const corsWhiteList = function(req, callback) {
  var corsOptions;
  if (WHITELIST_URL.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

/**
 *  PAYLOAD WHITELIST
 *
 */
// for users route
const USERS = {
  users: {
    create: ['email', 'password', 'phone', 'company', 'name'],
  },
};

export const WHITELIST = { ...USERS };
