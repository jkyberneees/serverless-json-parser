const contentType = require('content-type')

module.exports = (config = {}) => {
  return (req, res, next) => {
    try {
      const { type } = contentType.parse(req)

      if (type === 'application/json') {
        if (req.body instanceof Buffer || typeof req.body === 'string') {
          req.body = JSON.parse(req.body)

          return next()
        } else {
          res.statusCode = 415
          res.end()
        }
      }
    } catch (err) {
      if (err.message !== 'content-type header is missing from object') {
        return next(err)
      }
    }
    return next()
  }
}
