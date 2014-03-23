exports.clientErrorHandler = function(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

exports.logErrors = function(err, req, res, next) {
  if (!err) {
    return;
  }
  console.error(err.stack);
  next(err);
}

exports.errorHandler = function(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
