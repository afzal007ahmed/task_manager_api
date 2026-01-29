const errorMiddleware = ( err, _req, res, _next ) => {
  const errorMessage = err.message || 'Something went wrong.';
  const errorStatus = err.code || 500;
  res.status(errorStatus).send({
    message: errorMessage,
  });
};


module.exports = {errorMiddleware};
