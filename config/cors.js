const cors = require('cors');

module.exports.corsConfig = cors({
  origin: [
    /http:\/\/localhost(:\d+)?/,
    /https?:\/\/enslit-movies.nomoredomains.club/,
  ],
  credentials: true,
});
