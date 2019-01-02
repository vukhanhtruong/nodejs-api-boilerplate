import { WHITELIST } from './whitelist';
require('dotenv').config({});

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
  REDIS_HOST: process.env.REDIS_HOST_DEV,
  REDIS_PORT: process.env.REDIS_PORT_DEV,
  REDIS_PASSWORD: '',
  MAIL_API_KEY: process.env.SENDGRID_API_KEY_DEV,
  FROM_EMAIL: `"${process.env.FROM_EMAIL_NAME_DEV}" <${
    process.env.FROM_EMAIL_DEV
  }>`,
};

const testConfig = {
  JWT_SECRET: process.env.JWT_SECRET_TEST,
  MONGO_URL: process.env.MONGO_URL_TEST,
  REDIS_HOST: process.env.REDIS_HOST_TEST,
  REDIS_PORT: process.env.REDIS_PORT_TEST,
  REDIS_PASSWORD: '',
  MAIL_API_KEY: process.env.SENDGRID_API_KEY_TEST,
  FROM_EMAIL: `"${process.env.FROM_EMAIL_NAME_TEST}" <${
    process.env.FROM_EMAIL_TEST
  }>`,
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
  REDIS_HOST: process.env.REDIS_HOST_PROD,
  REDIS_PORT: process.env.REDIS_PORT_PROD,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD_PROD,
  MAIL_API_KEY: process.env.SENDGRID_API_KEY_PROD,
  FROM_EMAIL: `"${process.env.FROM_EMAIL_NAME_PROD}" <${
    process.env.FROM_EMAIL_PROD
  }>`,
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  SENTRY_DSN: process.env.SENTRY_DSN,
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
