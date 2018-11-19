/* eslint-disable no-console */

/**
 * Configuration for the database
 */

import mongoose from 'mongoose';
import chalk from 'chalk';
import constants from './constants';

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', !(process.env.NODE_ENV === 'production'));
// Connect the db with the url provide
try {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(
    constants.MONGO_URL,
    { useNewUrlParser: true },
  );
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () =>
    console.log(
      chalk.yellow.bold(`
        MongoDB is running
        Mongo URL: ${constants.MONGO_URL}
      `),
    ),
  )
  .on('error', e => {
    throw e;
  });
