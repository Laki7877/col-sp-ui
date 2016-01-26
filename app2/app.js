require('./vendor.js');
require('./template.js');

angular.module('app', ['ui.bootstrap.datetimepicker', 'duScroll','ngSanitize','ui.select', 'ngAnimate', 'angularFileUpload', 'ui.tree', 'ui.select', 'ui.bootstrap', 'base64'])
.controller('RootCtrl', function() {})
.run(function($base64, storage) {
	storage.storeSessionToken($base64.encode('duckvader:vader'));
});

require('./config.js');
require('bulk-require')(__dirname, ['./**/*.js']);