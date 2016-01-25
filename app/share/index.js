require('../vendor.js');
require('./config');

angular.module('app.share', ['app.config', 'angularFileUpload']);
require('bulk-require')(__dirname, ['**/*.js']);
module.exports = app;