const mongoose = require('mongoose');
const connection = 'mongodb://mongo:27017/';

const connectDb = () => {
  const connect = () => {
    mongoose.connect(
      connection,
      {
        dbName: 'lunch',
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      },
      error => {
        if (error) {
          console.log('mongodb connection error', error);
        } else {
          console.log('mongodb connection success');
        }
      },
    );
  };

  connect();

  mongoose.connection.on('error', error => {
    console.error('mongodb connection error', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('mongodb disconnected. retry to connect');
  });
};

module.exports = connectDb;
