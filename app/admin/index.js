require('../vendor.js');
require('./share');
require('./config');

angular.module('app.admin', ['app.share', 'ui.bootstrap.datetimepicker', 'duScroll','ngSanitize','ui.select', 'ngAnimate', 'angularFileUpload', 'ui.tree', 'ui.select', 'ui.bootstrap', 'base64']);
require('bulk-require')(__dirname, ['**/*.js']);
