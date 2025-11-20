const whitelist = [];
const env = require( './environments');

const corsOptions = {
  origin: function (
    origin,
    callback
  ) {
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }
    if (origin !== undefined && whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Your domain is not compatible with my policy !'));
    }
  },
  optionsSuccessStatus: 204
};
module.exports = corsOptions;
