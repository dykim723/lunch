const mongoose = require('mongoose');

const User = require('../src/models/Person');

const connection = 'mongodb://mongo:27017/lunch';

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
