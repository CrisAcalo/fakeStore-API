//file middlewares/error.handler.js
const { Sequelize } = require('sequelize');
function logErrors(err, req, res, next) {
  // console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function sequelizeHandler(err, req, res, next) {
  if (err instanceof Sequelize.ValidationError) {
    return res.status(400).json({
      message: err.errors.map((e) => e.message),
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}



module.exports = { logErrors, sequelizeHandler, boomErrorHandler, errorHandler };
