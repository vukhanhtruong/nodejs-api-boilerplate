import { WHITELIST } from './whitelist';
require('dotenv').config({});

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
  REDIS_HOST: process.env.REDIS_HOST_DEV,
  REDIS_PORT: process.env.REDIS_PORT_DEV,
  REDIS_PASSWORD: '',
};

const testConfig = {
  JWT_SECRET: process.env.JWT_SECRET_TEST,
  MONGO_URL: process.env.MONGO_URL_TEST,
  REDIS_HOST: process.env.REDIS_HOST_TEST,
  REDIS_PORT: process.env.REDIS_PORT_TEST,
  REDIS_PASSWORD: '',
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
  REDIS_HOST: process.env.REDIS_HOST_PROD,
  REDIS_PORT: process.env.REDIS_PORT_PROD,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD_PROD,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  RAVEN_ID: process.env.RAVEN_ID,
  WHITELIST: { ...WHITELIST },
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
