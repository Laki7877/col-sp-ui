// Jenkins will move `config.js` to `baseconfig.js`
// And will create a new version of config.js with overrides from this file
var baseConfig = require('./baseconfig');
var config = baseConfig;

var alphaConfigOverrides = {
    REST_SERVICE_BASE_URL: 'http://seller-service-api.alpha/api'
};

for (var key in alphaConfigOverrides) {
  config[key] = alphaConfigOverrides[key];
}

module.exports = config;
