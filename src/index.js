/* eslint-disable no-console */
/**
 * Server setup
 */
import express from 'express';
import chalk from 'chalk';
import { SentryLog } from '@/services/log';
import './config/database';
import middlewaresConfig from './config/middlewares';
import constants from './config/constants';
import ApiRoutes from './config/routes';

const app = express();
const env = process.env.NODE_ENV;

// Wrap all the middlewares with the server
middlewaresConfig(app);

// The error handler must be before any other error middleware
if (env === 'production') app.use(SentryLog().Handlers.errorHandler());

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);

// The error handler must be before any other error middleware
if (env === 'production') app.use(SentryLog().Handlers.errorHandler());

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(constants.PORT, err => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
        Yep this is working 🍺
        App listen on port: ${constants.PORT} 🍕
        Env: ${process.env.NODE_ENV} 🦄
      `,
        ),
      );
    }
  });
}

export default app;
