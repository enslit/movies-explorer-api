const { TIME_MS } = require('./constants');

const rateLimit = require('express-rate-limit');

module.exports.limiterConfig = rateLimit({
  windowMs: 15 * TIME_MS.minute,
  max: 50,
});
