const { config } = require('../../config')

function logErrors(err, req, res, next) {
  console.error(err.stack)
  next(err)
}

// catch errors for AJAX request
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).json({ err: err.message })
  } else {
    next(err)
  }
}

// catch errors while streaming
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err)
  }
  if (!config.dev) {
    delete err.stack
  }
  res.status(err.status || 500)
  res.render('error', { error: err })
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
}