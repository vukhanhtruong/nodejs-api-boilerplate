const mongoose = require('mongoose');
const R = require('ramda');
require('dotenv').config({});

// Jest configuration
jest.setTimeout(10000);

const MONGO_URL = process.env.MONGO_URL_TEST;
// Implementation Jest hooks
beforeEach(function(done) {
  // Loop through all the collections in our mongoose connection and drop them.
  const removeCollection = i => mongoose.connection.collections[i].remove();
  const clearDB = () => {
    R.forEach(removeCollection, mongoose.connection.collections);
    return done();
  };

  // If the mongoose connection is closed, start it up
  const onConnected = error => {
    if (error) throw error;
    clearDB();
  };

  const createConnection = url => {
    mongoose.connect(
      url,
      onConnected,
    );
  };

  const mongod = (function() {
    return mongoose.connection.readyState === 0
      ? createConnection(MONGO_URL)
      : clearDB();
  })();
});

afterEach(function(done) {
  return done();
});

afterAll(done => {
  mongoose.disconnect();
  return done();
});
