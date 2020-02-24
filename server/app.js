const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDb = require('./src/connection');

const indexRouter = require('./routes/index');
const peopleRouter = require('./routes/people');

const app = express();

const PORT = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/people', peopleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb();
});

module.exports = app;
